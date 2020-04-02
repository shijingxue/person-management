import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName:"login_home_hello" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_hello" */ '../components/Home.vue')
const Hello = () => import(/* webpackChunkName:"login_home_hello" */ '../components/Hello.vue')
const Division = () => import(/* webpackChunkName:"department" */ '../components/department/Division.vue')
const Position = () => import(/* webpackChunkName:"department" */ '../components/department/Position.vue')
const Employee = () => import(/* webpackChunkName:"employee" */ '../components/employee/Employee.vue')
const EmployeeChange = () => import(/* webpackChunkName:"employee" */ '../components/employee/Employee_change.vue')
const Rewards = () => import(/* webpackChunkName:"reward" */ '../components/reward/Rewards.vue')
const Users = () => import(/* webpackChunkName:"user" */ '../components/user/Users.vue')
const Check = () => import(/* webpackChunkName:"check" */ '../components/check/Check.vue')
const Pay = () => import(/* webpackChunkName:"pay" */ '../components/pay/Pay.vue')

// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Hello from '../components/Hello.vue'
// import Division from '../components/department/Division.vue'
// import Position from '../components/department/Position.vue'
// import Employee from '../components/employee/Employee.vue'
// import EmployeeChange from '../components/employee/Employee_change.vue'
// import Rewards from '../components/reward/Rewards.vue'
// import Users from '../components/user/Users.vue'
// import Check from '../components/check/Check.vue'
// import Pay from '../components/pay/Pay.vue'

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
        },
        {
          path: '/userinformation',
          component: Users
        },
        {
          path: '/salaryentry',
          component: Pay
        },
        {
          path: '/salarychanges',
          component: EmployeeChange
        },
        {
          path: '/attendance',
          component: Check
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
