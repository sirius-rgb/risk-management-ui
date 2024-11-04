import React from "react"

const PageTitle = ({title}:{title:string}) => {
  return (
    <h2 className="my-4 text-4xl font-semibold text-gray-900 dark:text-white">
      {title}
    </h2>
  )
}

export default PageTitle