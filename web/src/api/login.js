import request from '@/utils/request'

export function login(code) {
  return request({
    method: 'get',
    url: `/login?code=${code}`
  })
}