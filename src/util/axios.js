import axios from 'axios'
axios.defaults.timeout = 100000 // 请求超时时间
export default (type = 'get', url, params, baseUrl) => {
  return new Promise((resolve, reject) => {
    let config = {
      method: type,
      url: baseUrl + url,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    type = type.toLocaleLowerCase()
    if (type === 'get') {
      config.params = params
    } else {
      config.data = params
    }
    // 添加响应拦截器
    axios.interceptors.response.use((response) => {
      if (response.data.success === false) console.log(3)
      return response
    }, (error) => {
      return reject(error)
    })
    axios(config).then(res => {
      if (res.data.success === false) reject(res.data)
      else resolve(res.data)
    }).catch(data => {
      console.log('catch error', data)
      reject(data)
    })
  })
}
