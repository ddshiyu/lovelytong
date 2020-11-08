import request from '@/utils/request'

export function getArticles() {
  return request({
    method: 'get',
    url: '/article'
  })
}

export function getArticleDetail(id) {
  return request({
    method: 'get',
    url: `/articleDetail?id=${id}`
  })
}

export function getTags() {
  return request({
    method: 'get',
    url: '/tag'
  })
}

export function getArticleByTag(tagId) {
  return request({
    method: 'get',
    url: `/articleByTag?tagId=${tagId}`
  })
}