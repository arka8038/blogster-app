import { Avatar } from "../components/Avatar"
import { Link } from "react-router-dom"

interface BlogCardProps {
  authorName: string
  publishedDate: string
  title: string
  content: string
}

export const BlogCard = ({ authorName, publishedDate, title, content }: BlogCardProps) => {
  return (
    <div className="border-b border-gray-200 pb-4 pt-4 w-screem max-w-screen-md">
      <div className="flex pb-2">
        <Avatar authorName={authorName} />
        <div className="font-bold flex flex-col justify-center">{authorName}</div>
        <div className="text-gray-500 mx-1 flex flex-col justify-center">•</div>
        <div className="text-gray-500 flex flex-col justify-center">{publishedDate}</div>
      </div>
      <div className="text-2xl font-bold mb-1">{title}</div>
      <div className="text-gray-500 mb-2">{content.slice(0, 100)}...</div>
      <div className="text-gray-500 mb-2">{`${Math.ceil(content.length / 1000)} min read`}</div>
      <Link className="text-blue-500 hover:underline" to="">
        Read More
      </Link>
    </div>
  )
}
