import { SinginInput } from "@arka8038/blogster-common"
import AuthForm from "../components/AuthForm"
import { Quote } from "../components/Quote"
import { useState } from "react"

export const Signin = () => {
  const [inputs, setInputs] = useState<SinginInput>({
    email: "",
    password: "",
  })

  const handleSubmit = () => {
    // Handle sign-up logic
    console.log("Sign-in data:", inputs)
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
