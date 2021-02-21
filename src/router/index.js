import Vue from 'vue'
import VueRouter from 'vue-router'
const Login = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Home.vue')
const Hello = () => import(/* webpackChunkName:"login_home_hello" */ '../views/Hello.vue')
const FoodList = () => import(/* webpackChunkName:"department" */ '../views/Food/FoodList.vue')
const NewUser = () => import(/* webpackChunkName:"department" */ '../views/User/NewUser.vue')
const ChangePwd = () => import(/* webpackChunkName:"employee" */ '../views/User/ChangePwd.vue')
// const EmployeeChange = () => import(/* webpackChunkName:"employee" */ '../views/employee/Employee_change.vue')
// const Rewards = () => import(/* webpackChunkName:"reward" */ '../views/reward/Rewards.vue')
// const Users = () => import(/* webpackChunkName:"user" */ '../views/user/Users.vue')
// const Check = () => import(/* webpackChunkName:"check" */ '../views/check/Check.vue')
// const Pay = () => import(/* webpackChunkName:"pay" */ '../views/pay/Pay.vue')

// import Login from '../views/Login.vue'
// import Home from '../views/Home.vue'
// import Hello from '../views/Hello.vue'
// import Division from '../views/department/Division.vue'
// import Position from '../views/department/Position.vue'
// import Employee from '../views/employee/Employee.vue'
// import EmployeeChange from '../views/employee/Employee_change.vue'
// import Rewards from '../views/reward/Rewards.vue'
// import Users from '../views/user/Users.vue'
// import Check from '../views/check/Check.vue'
// import Pay from '../views/pay/Pay.vue'

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
          path: '/foodlist',
          component: FoodList
        },
        {
          path: '/newuser',
          component: NewUser
        },
        {
          path: '/changepwd',
          component: ChangePwd
        }
        // {
        //   path: '/randp',
        //   component: Rewards
        // },
        // {
        //   path: '/userinformation',
        //   component: Users
        // },
        // {
        //   path: '/salaryentry',
        //   component: Pay
        // },
        // {
        //   path: '/salarychanges',
        //   component: EmployeeChange
        // },
        // {
        //   path: '/attendance',
        //   component: Check
        // }
      ]
    }
  ]
})
// 路由导航守卫
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') {
//     return next()
//   }
//   //  如果访问的不是登录页 则验证他们的token
//   const isToken = window.sessionStorage.getItem('token')
//   if (!isToken) {
//     return next('/login')
//   }
//   next()
// })
export default router
