import request from '@/utils/request'

export function getWebUser() {
  return request({
    method: 'get',
    url: '/rest/webUser'
  })
}

export function deleteWebUser(id) {
  return request({
    method: 'delete',
    url: '/rest/webUser/' + id
  })
}
