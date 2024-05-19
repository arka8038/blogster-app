import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@arka8038/blogster-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const authToken = c.req.header("authorization") || ""
    const user = await verify(authToken, c.env.JWT_SECRET)
    try {
        if (user) {
            c.set("userId", user.id)
            await next()
        } else {
            c.status(403)
            c.json({
                message: "User is not logged in"
            })
        }
    } catch (e) {
        c.status(403)
        c.json({
            message: "User is not logged in"
        })
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success, error } = createBlogInput.safeParse(body);

    if (!success) {
      c.status(400)
      return c.json({
        message: "Inputs are not correct",
        errors: error.errors
      });
    }

    const authorId = c.get("userId")

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()
    const { success, error } = updateBlogInput.safeParse(body);

    if (!success) {
      c.status(400)
      return c.json({
        message: "Inputs are not correct",
        errors: error.errors
      });
    }

    const authorId = c.get("userId")

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    try {
        const blogs = await prisma.blog.findMany()

        return c.json({
            blogs
        })
    } catch (e) {
        c.status(411)
        c.json({
            message: "Error while fetching all blogs"
        })
    }
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id")

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id
            }
        })

        return c.json({
            blog
        })
    } catch (e) {
        c.status(411)
        c.json({
            message: "Error while fetching blog post"
        })
    }
})
