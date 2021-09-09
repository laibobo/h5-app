import request from '@/pubilc/request.js'

export const login = (params) => {
  return request({
    url: '/user/login',
    params
  })
}
