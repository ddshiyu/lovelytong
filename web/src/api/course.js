import request from '@/utils/request'

export function getCourse() {
  return request({
    method: 'get',
    url: '/course'
  })
}