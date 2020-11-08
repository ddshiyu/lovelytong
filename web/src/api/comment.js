import request from '@/utils/request'

export function sendComment(data) {
  return request({
    method: 'post',
    url: '/sendComment',
    data
  })
}

export function getComment(article_id) {
  return request({
    method: 'get',
    url: `/getComment?article_id=${article_id}`
  })
}