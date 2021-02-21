import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Mix from './components/minix/Mix'

// 导入nprogress进度栏插件
import Nprogress from 'nprogress'

// 时间格式化插件
// import moment from 'moment/moment'
// import ElementUI from 'element-ui'
import ElementUI, {
  Message
} from 'element-ui'
// 样式文件一定要引入
// import 'element-ui/lib/theme-chalk/index.css'
import './assets/fonts/iconfont.css'
import './assets/css/common.css'

Vue.component('Mix', Mix)
Vue.use(ElementUI)
// Vue.use(moment)
Vue.config.productionTip = false
// 配置接口的基准地址
// axios.defaults.baseURL = `http://www.ljsss.cn:8085/`
axios.defaults.baseURL = `http://127.0.0.1:8085/`
// axios.defaults.baseURL = `/api`
Vue.prototype.$http = axios
// 请求在到达服务器之前，先会调用use中的这个回调函数来添加请求头信息
// axios.interceptors.request.use(config => {
//   Nprogress.start()
//   // 为请求头对象，添加token验证的Authorization字段
//   // config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })

// 响应拦截器
// axios.interceptors.response.use(config => {
//   Nprogress.done()
//   return config
// })

Vue.prototype.$message = Message

// 格式化时间过滤器
// Vue.filter('moment', function(time,format) {
  // if(time){
  // return moment(time).format(format)
  // }
// })
Vue.filter('moment', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
