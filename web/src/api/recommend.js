import request from '@/utils/request'

export function getRecommend() {
  return request({
    method: 'get',
    url: '/recommend'
  })
}

export function getCategory() {
  return request({
    method: 'get',
    url: '/category'
  })
}

export function getHotMess() {
  return request({
    method: 'get',
    url: '/hotMess'
  })
}

export function getLearningData(page) {
  return request({
    method: 'get',
    url: `/learningData?page=${page}`
  })
}