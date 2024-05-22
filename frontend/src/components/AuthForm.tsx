import { Link } from "react-router-dom"
import { LabelledInputBox } from "./LabelledInputBox"
import { SingupInput } from "@arka8038/blogster-common"
import { ChangeEvent, FC } from "react"

interface AuthFormProps {
  formType: "signup" | "signin"
  inputs: SingupInput
  setInputs: React.Dispatch<React.SetStateAction<SingupInput>>
  handleSubmit: () => void
  linkTo: string
  linkText: string
  title: string
  subtitle: string
}

export const AuthForm: FC<AuthFormProps> = ({
  formType,
  setInputs,
  handleSubmit,
  linkTo,
  linkText,
  title,
  subtitle,
}) => {
  const handleInputChange = (field: keyof SingupInput) => (e: ChangeEvent<HTMLInputElement>) => {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [field]: e.target.value,
    }))
  }

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="font-bold text-3xl text-center">{title}</div>
            <div className="text-slate-500 text-center pb-4">
              {subtitle}
              <Link className="pl-2 underline" to={linkTo}>
                {linkText}
              </Link>
            </div>
          </div>
          <div>
            {formType === "signup" && (
              <LabelledInputBox label="Name" placeholder="Enter Name" onChange={handleInputChange("name")} />
            )}
            <LabelledInputBox label="Email Id" placeholder="Enter Email Id" onChange={handleInputChange("email")} />
            <LabelledInputBox
              label="Password"
              placeholder="Enter Password"
              type={"password"}
              onChange={handleInputChange("password")}
            />
            <button
              type="button"
              className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={handleSubmit}
            >
              {formType === "signup" ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
