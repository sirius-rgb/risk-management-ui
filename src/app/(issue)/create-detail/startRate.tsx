import { useStore } from "@/store"
import useSWR from "swr"

const StartRating = () => {
  const rating = useStore((state) => state.rating)
  const hoverRating = useStore((state) => state.hoverRating)

  const setRating = useStore((state) => state.setRating)
  const sendRating = useStore((state) => state.sendRating)
  const setHoverRating = useStore((state) => state.setHoverRating)
  const setFeedbackDialogOpen = useStore((state) => state.setFeedbackDialogOpen)

  const labels = [
    "Significantly Worse",
    "Worse",
    "Similar",
    "Better",
    "Significantly Better",
  ]

  const handleRating = (index: number) => {
    const score = index + 1
    setRating(score)
    // setFeedbackDialogOpen(true)
    // use useSWR send request to /api/feedback to record the rating

    // 因为下面的方法是一个请求， 我希望给这个请求加上防抖函数，2 秒内最后一次点击才会发送请求
    // 实现一个防抖函数 包裹 sendRating
    sendRating(score, "This is not a good result", "I-1024", "R-2048")
  }
  return (
    <div className="flex items-center justify-center  sm:justify-start">
      {labels.map((label, index) => (
        <button
          key={index}
          type="button"
          onMouseEnter={() => setHoverRating(index + 1)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => handleRating(index)}
          className="focus:outline-none"
        >
          <svg
            className={`me-1 h-4 w-4 ${
              (hoverRating || rating) > index
                ? "text-yellow-300"
                : "text-gray-300 dark:text-gray-500"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        </button>
      ))}

      <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {hoverRating || rating
          ? labels[(hoverRating || rating) - 1]
          : "No rating yet"}
      </p>
      {/* Please rate the quality of the output: */}
      {/* <span className="mx-2">Quality of output</span> */}
    </div>
  )
}

export default StartRating
