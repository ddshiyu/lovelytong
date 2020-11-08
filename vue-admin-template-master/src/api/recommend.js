import request from '@/utils/request'

export function getRecommend(params) {
  return request({
    url: '/rest/recommend',
    method: 'get',
    params
  })
}

export function createRecommend(data) {
  return request({
    data,
    url: '/rest/recommend',
    method: 'post'
  })
}

export function deleteRecommend(id) {
  return request({
    url: `/rest/recommend/${id}`,
    method: 'delete'
  })
}

export function getRecommendById(id) {
  return request({
    url: `/rest/recommend/${id}`,
    method: 'get'
  })
}

export function updateRecommend(data, id) {
  return request({
    method: 'put',
    url: `/rest/recommend/${id}`,
    data
  })
}
