import { ChangeEvent } from "react"

interface LabelledInputBox {
  label: string
  placeholder: string
  type?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const LabelledInputBox = ({ label, placeholder, type, onChange }: LabelledInputBox) => {
  return (
    <div>
      <label className="block mb-2 text-sm text-gray-900 font-bold pt-4">{label}</label>
      <input
        onChange={onChange}
        type={type ||"text"}
        id="first_name"
        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  )
}
