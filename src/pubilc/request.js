import axios from 'axios'
import { Toast } from 'vant'
const service = axios.create({
  baseURL: process.env.BASE_API_URL,
  timeout: 5000
})

service.defaults.headers.post['Content-Type'] = 'application/json'
service.interceptors.request.use((config) => {
  return config
})
// 拦截响应response，并做一些错误处理
service.interceptors.response.use((response) => {
  return response
}, (error) => {
  const message = `API请求出错！ ${error && error.response ? error.response.statusText : ''}  ${error && error.response ? error.response.status : ''}`
  Toast({
    message,
    position: 'top'
  })
  return Promise.reject(error)
})

const serialize = (query) => {
  const str = []
  for(const p in query){
    if(Object.prototype.hasOwnProperty.call(query, p)){
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(query[p]))
    }
  }
  return str.join('&')
}

const request = ({
  url,
  query,
  params,
  method = 'post',
  headers = {},
  timeout,
  responseType
}) => {
  let queryString = ''
  if(query){
    queryString = '?' + serialize(query)
  }
  if(responseType){
    headers.responseType = responseType
  }
  const promise = new Promise(
    (resolve, reject) => {
      service[method](url + queryString, params, {
        headers,
        timeout
      }).then(res => {
        resolve(res.data)
      }, error => {
        reject(error)
      })
    })
  return promise
}

export default request
