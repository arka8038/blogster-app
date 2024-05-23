import { SinginInput } from "@arka8038/blogster-common"
import AuthForm from "../components/AuthForm"
import { Quote } from "../components/Quote"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

export const Signin = () => {
  const [inputs, setInputs] = useState<SinginInput>({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, inputs)
      localStorage.setItem("token", res.data.token)
      navigate("/blogs")
    } catch (error) {
      const message = getErrorMessage(error)
      console.error("Signup error:", error)
      alert(message)
    }
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <AuthForm
          formType="signin"
          inputs={inputs}
          setInputs={setInputs}
          handleSubmit={handleSubmit}
          linkTo="/signup"
          linkText="Sign Up"
          title="Sign In"
          subtitle="Don't have an account?"
        />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Signin failed. Please try again."
  } else if (error instanceof Error) {
    return error.message
  } else {
    return "An unknown error occurred. Please try again."
  }
}
