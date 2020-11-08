export function validateTime(date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const dat = date.getDate()
  const day = date.getDay()
  const hours = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  const minutes = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  const second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  return `${year}年 - ${month}月 - ${dat}日 ${hours}:${minutes}:${second}`
}