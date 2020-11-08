import request from '@/utils/request'

export function createAbout(data) {
  return request({
    url: '/rest/about',
    method: 'post',
    data
  })
}

export function getAbout() {
  return request({
    url: '/rest/about',
    method: 'get'
  })
}

export function deleteAbout(id) {
  return request({
    url: `/rest/about/${id}`,
    method: 'delete'
  })
}

export function getAboutById(id) {
  return request({
    url: `/rest/about/${id}`,
    method: 'get'
  })
}

export function updateAbout(data, id) {
  return request({
    url: `/rest/about/${id}`,
    method: 'put',
    data
  })
}
