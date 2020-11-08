import request from '@/utils/request'

export function createArticle(data) {
  return request({
    url: '/rest/article',
    method: 'post',
    data
  })
}

export function getArticle() {
  return request({
    url: '/rest/article',
    method: 'get'
  })
}

export function deleteArticle(id) {
  return request({
    url: `/rest/article/${id}`,
    method: 'delete'
  })
}

export function getArticleById(id) {
  return request({
    url: `/rest/article/${id}`,
    method: 'get'
  })
}

export function updateArticle(data, id) {
  return request({
    url: `/rest/article/${id}`,
    method: 'put',
    data
  })
}
