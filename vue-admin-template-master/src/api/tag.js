import request from '@/utils/request'

export function createTag(data) {
  return request({
    url: '/rest/tag',
    method: 'post',
    data
  })
}

export function getTag() {
  return request({
    url: '/rest/tag',
    method: 'get'
  })
}

export function deleteTag(id) {
  return request({
    url: `/rest/tag/${id}`,
    method: 'delete'
  })
}

export function getTagById(id) {
  return request({
    url: `/rest/tag/${id}`,
    method: 'get'
  })
}

export function updateTag(data, id) {
  return request({
    url: `/rest/tag/${id}`,
    method: 'put',
    data
  })
}
