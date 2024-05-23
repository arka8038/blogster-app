import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { Footer } from "../components/Footer"
import { useBlogs } from "../hooks"

export const Blogs = () => {
  const { loading, blogs } = useBlogs()

  if (loading) {
    return <div>...loading</div>
  } else {
    return (
      <>
        <AppBar />
        <div className="flex justify-center">
          <div className="max-w-xl">
            {blogs.map((blog) => (
              <BlogCard
                authorName={blog.author.name || "Anonymous"}
                publishedDate={"1st May 2024"}
                title={blog.title}
                content={blog.content}
              />
            ))}
          </div>
        </div>
        <Footer />
      </>
    )
  }
}
