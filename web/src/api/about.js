import request from '@/utils/request'

export function getAbout() {
  return request({
    method: 'get',
    url: '/about'
  })
}