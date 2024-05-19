import { Hono, Context } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'
import { signinInput, signupInput } from '@arka8038/blogster-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

interface PrismaError extends Error {
  code?: string
}

function isPrismaError(error: any): error is PrismaError {
  return typeof error === 'object' && error !== null && 'code' in error
}

function handleError(c: Context, e: unknown) {
  if (isPrismaError(e)) {
    console.error('Prisma error:', e)
    if (e.code === 'P2002') {
      c.status(409)
      return c.json({ error: "Email already in use" })
    }
  } else {
    console.error('Unknown error:', e)
  }
  c.status(500)
  return c.json({ error: "Internal server error" })
}

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const { success, error } = signupInput.safeParse(body);

    if (!success) {
      c.status(400)
      return c.json({
        message: "Inputs are not correct",
        errors: error.errors
      });
    }

    const { email, name, password } = body

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token })

  } catch (e) {
    return handleError(c, e)
  }
})

userRouter.post('signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try {
    const body = await c.req.json()
    const { success, error } = signinInput.safeParse(body);

    if (!success) {
      c.status(400)
      return c.json({
        message: "Inputs are not correct",
        errors: error.errors
      });
    }

    const { email, password } = body
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user || !await bcrypt.compare(password, user.password)) {
      c.status(403)
      return c.json({ error: "Unauthorized user" })
    }

    const token = await sign(
      { id: user.id },
      c.env.JWT_SECRET
    )
    return c.json({ token })
  } catch (e) {
    return handleError(c, e)
  }
})