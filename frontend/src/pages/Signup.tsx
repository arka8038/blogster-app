import { SingupInput } from "@arka8038/blogster-common"
import AuthForm from "../components/AuthForm"
import { Quote } from "../components/Quote"
import { useState } from "react"

export const Signup = () => {
  const [inputs, setInputs] = useState<SingupInput>({
    name: "",
    email: "",
    password: "",
  })

  const handleSubmit = () => {
    // Handle sign-up logic
    console.log("Sign-up data:", inputs)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <AuthForm
          formType="signup"
          inputs={inputs}
          setInputs={setInputs}
          handleSubmit={handleSubmit}
          linkTo="/signin"
          linkText="Login"
          title="Create an account"
          subtitle="Already have an account?"
        />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  )
}
