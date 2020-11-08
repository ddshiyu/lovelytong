import request from '@/utils/request'

export function createCategory(data) {
  return request({
    url: '/rest/category',
    method: 'post',
    data
  })
}

export function getCategory() {
  return request({
    url: '/rest/category',
    method: 'get'
  })
}

export function deleteCategory(id) {
  return request({
    url: `/rest/category/${id}`,
    method: 'delete'
  })
}

export function getCategoryById(id) {
  return request({
    url: `/rest/category/${id}`,
    method: 'get'
  })
}

export function updateCategory(data, id) {
  return request({
    url: `/rest/category/${id}`,
    method: 'put',
    data
  })
}
