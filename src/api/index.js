import request from '@/pubilc/request.js'

export const login = (params) => {
  return request({
    url: '/user/login',
    params
  })
}
export const getUserInfo = (query) => {
  return request({
    url: '/user/info',
    method: 'get',
    query
  })
}
