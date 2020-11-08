import request from '@/utils/request'

export function createExperience(data) {
  return request({
    url: '/rest/experience',
    method: 'post',
    data
  })
}

export function getExperience() {
  return request({
    url: '/rest/experience',
    method: 'get'
  })
}

export function deleteExperience(id) {
  return request({
    url: `/rest/experience/${id}`,
    method: 'delete'
  })
}

export function getExperienceById(id) {
  return request({
    url: `/rest/experience/${id}`,
    method: 'get'
  })
}

export function updateExperience(data, id) {
  return request({
    url: `/rest/experience/${id}`,
    method: 'put',
    data
  })
}
