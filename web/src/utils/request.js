import axios from 'axios'
import message from '@/components/messageBox/messageBox.js'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(

  response => {
    const res = response.data
    if(res.code !== 200) {
      console.log('相应错误')
      message(res.message)
      return Promise.reject(new Error(res.message || 'error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    message('接口请求错误了，请刷新重试')
    return Promise.reject(error)
  }
)

export default service