import axios from 'axios'
import { Toast } from 'vant'
import Vue from 'Vue'
const merge = require('webpack-merge')

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.interceptors.request.use((config) => {
  return config
})
// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  const apiurl = error.config.url
  const formatUrl = apiurl.replace(/\?.*$/, '')
  const flag = Vue.ignoreapis.indexOf(formatUrl) >= 0 || Vue.ignore401.indexOf(formatUrl) >= 0
  if(!flag){
    const message = `API请求出错！ ${error != null && error.response != null ? error.response.statusText : ''}  ${error != null && error.response != null ? error.response.status : ''}`
    Toast({
      message,
      position: 'top'
    })
  }
  return Promise.reject(error)
})

// API调用方，通过ignoreerror.ignore将调用的API地址放到Vue.ignoreapis对象中，如果API出错，不在上面的公共异常处理中提示用户，由调用方自行处理
Vue.ignoreapis = []
Vue.ignore401 = []
const ignoreerror = {
  ignore: (apiname) => {
    if(Vue.ignoreapis.indexOf(apiname) === -1){
      Vue.ignoreapis.push(apiname)
    }
  },
  ignoreCancel: (apiname) => {
    if(Vue.ignoreapis.indexOf(apiname) >= 0) Vue.ignoreapis.splice(Vue.ignoreapis.indexOf(apiname), 1)
  },
  ignore401: (apiname) => {
    if(Vue.ignore401.indexOf(apiname) === -1){
      Vue.ignore401.push(apiname)
    }
  },
  ignore401Cancel: (apiname) => {
    if(Vue.ignore401.indexOf(apiname) >= 0) Vue.ignore401.splice(Vue.ignore401.indexOf(apiname), 1)
  }
}
const $http = merge(axios, ignoreerror)

function serialize(query){
  const str = []
  for(const p in query){
    if(Object.prototype.hasOwnProperty.call(query, p)){
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]))
    }
  }
  return str.join('&')
}
const returnResultPromise = ({
  url,
  query,
  params,
  ignore = false,
  method = 'post',
  headers = {},
  ignore401 = false,
  timeout,
  responseType
}) => {
  url = process.env.VUE_APP_URL + url
  let queryString = ''
  if(query){
    queryString = '?' + serialize(query)
  }
  if(responseType){
    headers.responseType = responseType
  }
  const promise = new Promise(
    (resolve, reject) => {
      $http[method](url + queryString, params, {
        headers,
        timeout
      }).then(res => {
        resolve(res.data)
      }, rej => {
        reject(rej)
      })
    })
  return promise
}
export default {
  install(Vue){
    Vue.prototype.$http = axios
    Vue.http = axios
  },
  returnResultPromise
}
