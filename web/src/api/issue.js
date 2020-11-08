import request from '@/utils/request'

export function getIssue() {
  return request({
    method: 'get',
    url: '/issue'
  })
}

export function saveIssue(data) {
  return request ({
    method: 'post',
    url: '/issue',
    data
  })
}