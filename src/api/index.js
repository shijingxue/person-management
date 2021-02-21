// 主机地址
import HOST from '@/api/host'

// 合并Api
const api = {
  LOGIN: '/login',
  // 查询所有菜品
  SELECTALLFOOD: '/food/selectAllFoodList',
  // 根据菜品种类id查询菜品列表
  SELECTFOODTYPELIST: '/food/selectFoodList',
  // 为菜品种类新增菜品 
  FOODTYPESETFOOD: '/food/FoodTypesetFood',
  // 新增菜品
  ADDFOOD: '/food/addFood',
  FOODIMAGE: '/food/fileUp',
  // 修改菜品
  EDITFOOD: '/food/updateFood',
  // 新增菜品种类
  ADDFOODTYPE: '/foodType/addFoodType',
  // 查询所有菜品种类
  SELECTALLFOODTYPE: '/foodType/selectFoodType',
  // 修改菜品种类
  EDITFOODTYPE: '/foodType/updateFoodType',
  // 删除菜品种类
  DELETEFOODTYPE: '/foodType/deleteFoodType',

  // 用户操作
  // 新增用户
  ADDUSERS: '/user/addUser',
  // 重置密码
  RESETPASSWORD: '/user/resetPassWord',
  // 修改密码
  UPDATEPASSWORD: '/user/updatePassWord',

  // 为菜品下单
  USERORDERXIADAN: '/userOrder/xiadan'
}

// Api添加主机地址
for (let key in api) {
  api[key] = HOST + api[key]
}

// 导出Api
export default api
