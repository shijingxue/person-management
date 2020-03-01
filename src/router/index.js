import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Hello from '../components/Hello.vue'
import Division from '../components/department/Division.vue'
import Position from '../components/department/Position.vue'
import Employee from '../components/employee/Employee.vue'
import Rewards from '../components/reward/Rewards.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          redirect: '/hello'
        },
        {
          path: '/hello',
          component: Hello
        },
        {
          path: '/branchmessage',
          component: Division
        },
        {
          path: '/branchposition',
          component: Position
        },
        {
          path: '/staff',
          component: Employee
        },
        {
          path: '/randp',
          component: Rewards
        }
      ]
    }
  ]
})
// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  //  如果访问的不是登录页 则验证他们的token
  const isToken = window.sessionStorage.getItem('token')
  if (!isToken) {
    return next('/login')
  }
  next()
})
export default router
