import { SVGProps } from "react"
import { Link } from "react-router-dom"
import { JSX } from "react/jsx-runtime"

export const AppBar = () => {
  return (
    <>
      <header className="bg-gray-900 text-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <div className="pl-4 marker:flex items-center">
            <Link className="flex items-center" to="/blogs">
              <MountainIcon className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">Blogster</span>
            </Link>
          </div>
          <nav className="flex space-x-4 mt-4 md:mt-0 pr-4">
            <Link className="hover:text-gray-300" to="/blogs">
              Home
            </Link>
            <Link className="hover:text-gray-300" to="/blogs">
              Categories
            </Link>
            <Link className="hover:text-gray-300" to="/blogs">
              About
            </Link>
            <Link className="hover:text-gray-300" to="/blogs">
              Contact
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
