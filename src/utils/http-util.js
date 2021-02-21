import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // Add custom HTTP header
  // TODO:暂时未加入token
  const Authorization = window.localStorage.getItem('Authorization')
  if (Authorization) {
    config.headers['Authorization'] = Authorization
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
    return response
  }, error => {
    if (error.response.status === 401) {
      console.log('没有权限，重新登录')
      if (!document.getElementsByClassName('el-message').length) {
        error.response && Message.error(error.response.data.message)
      }
      // 清空本地存储
      window.localStorage.clear()
      // 导航到登录页
      router.push('/login')
      return false
    } else {
      return Promise.reject(error)
    }
  }
)

const _request = function (url, method, otherData, success, error) {
  // 公共参数
  const publicData = {
  }

  // 用户传入的数据和公共数据合并
  const data = {
    // 公共参数
    ...publicData,
    // 其他参数
    ...otherData
  }

  // 根据不同的HTTP方法发送发送请求
  switch (method) {
      // GET方式
    case 'get':
      axios({
        method,
        url,
        params: data
      }).then(function (response) {
        success(response)
      }).catch(function (err) {
        if (error) {
          error(err)
        } else {
          err.response && Message.error(err.response.data.message)
        }
      })
      break
      //  POST/PUT/DELETE方式
    case 'post':
    case 'put':
    case 'delete':
      axios({
        method,
        url,
        data
      }).then(function (response) {
        success(response)
      }).catch(function (err) {
        if (error) {
          error(err)
        } else {
          err.response && Message.error(err.response.data.message)
        }
      })
      break
  }
}

/**
 * HTTP GET方法的封装
 *
 * @param url 请求的URL
 * @param otherData 请求的其他参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
const get = function (url, otherData, success, error) {
  _request(url, 'get', otherData, success, error)
}

/**
 * HTTP POST方法的封装
 *
 * @param url 请求的URL
 * @param otherData 请求的其他参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
const post = function (url, otherData, success, error) {
  _request(url, 'post', otherData, success, error)
}

/**
 * HTTP PUT方法的封装
 *
 * @param url 请求的URL
 * @param otherData 请求的其他参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
const put = function (url, otherData, success, error) {
  _request(url, 'put', otherData, success, error)
}

/**
 * HTTP DELETE方法的封装
 *
 * @param url 请求的URL
 * @param otherData 请求的其他参数
 * @param success 请求成功的回调函数
 * @param error 请求失败的回调函数
 */
const del = function (url, otherData, success, error) {
  _request(url, 'delete', otherData, success, error)
}

// 导出方法
export default {
  get,
  post,
  put,
  del
}
