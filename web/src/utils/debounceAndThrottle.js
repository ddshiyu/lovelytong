export function debounce(fn, delay) {
  let timeout
  return function() {
    const context = this
    const args = arguments
    console.log("新的",timeout)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}