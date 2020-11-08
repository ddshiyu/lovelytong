import request from '@/utils/request'

export function getViewsAmount() {
  return request({
    url: '/viewsAmount',
    method: 'get'
  })
}
