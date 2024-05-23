export const Avatar = ({ authorName }: { authorName: string }) => {
  return (
    <div className="mr-2 flex flex-col items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500">
      <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
    </div>
  )
}
