const error =
  "There are too many requests in a short period, please try again 20s later."

const match = error.match(/(\d+)s/) // 使用正则表达式提取数字
const countdownTime = match ? parseInt(match[1], 10) : 10 // 默认10秒

console.log(countdownTime)
