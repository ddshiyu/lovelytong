import request from '@/utils/request'

export function getIssue() {
  return request({
    method: 'get',
    url: '/rest/issue'
  })
}

export function deleteIssue(id) {
  return request({
    method: 'delete',
    url: '/rest/issue/' + id
  })
}
