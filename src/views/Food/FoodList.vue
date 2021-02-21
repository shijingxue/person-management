<template>
  <div class="food-list">
    <Mix nav1='菜品管理' nav2='菜品列表'></Mix>
    <div class="searchBox">
      <el-input
      style="width:30%"
        placeholder="请输入菜品名称"
        v-model="keyword"
        clearable>
      </el-input>
      <el-button class="searchBtn" type="primary" @click="handelSearch">搜索</el-button>
      <div class="btn-box">
        <el-button type="success" @click="addFood"  v-if="userType ==1 ">添加菜品</el-button>
        <el-button type="primary" @click="identifierDialogVisible = !identifierDialogVisible" v-if="userType ==1 ">管理菜品种类</el-button>
        <el-button type="primary" @click="cartDialogVisible= !cartDialogVisible" >购物车</el-button>
      </div>
    </div>

    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="iden.foodTypeName" :name="String(iden.foodTypeId)" v-for="(iden) in identifierList" :key="iden.foodTypeId" >
          <div class='food-container'>
            <el-button class="btn-btm2" type="primary" @click="addFoodTypeDialogVisible=true" v-if="activeName !== '999999' && userType ==1 ">添加菜品</el-button>

            <div v-if="foodTypeList.length == 0">
              暂无菜品！敬请期待哦！
            </div>

            <el-row :gutter="20" v-else>
              <el-col :span="6" v-for="item in foodTypeList" :key="item.foodId">
                <div class="grid-content bg-purple food-box">
                  <div class="food-describle">
                    <img :src='item.foodPhoto' alt="">
                    <div class="food-content">
                      <div class="food-title">{{item.foodName}}</div>
                      <div>¥：{{item.foodPrice}}</div>
                      <div class="food-introduce">{{item.foodIntroduce}}</div>
                      <el-tag v-if="item.foodType === '1' ">可点</el-tag>
                      <el-tag v-else  type="info" >售空</el-tag>
                    </div>
                  </div>
                  <div class="cart">
                    <el-button class="cartBtn" type="danger" @click="handleAddCart(item.foodId)" :disabled="item.foodType === '1'?false:true">加入购物车</el-button>
                    <el-button type="primary" @click="editFood(item.foodId)">修改</el-button>
                    <el-button type="warning" @click="deleteFood(item.foodId)">删除</el-button>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 新增菜品 -->
    <el-dialog
      :title="this.foodTitle"
      :visible.sync="addDialogVisible"
      width="30%"
      >
      <el-form :model="foodForm" :rules="foodRules" ref="foodFormRef" label-position="left" label-width="80px" class="demo-ruleForm">
        <el-form-item label="菜品名称" prop="foodName">
          <el-input v-model="foodForm.foodName"></el-input>
        </el-form-item>
        <el-form-item label="菜品价格" prop="foodPrice" >
          <el-input v-model="foodForm.foodPrice"></el-input>
        </el-form-item>
        <el-form-item label="菜品类型" prop="foodType">
          <el-select v-model="foodForm.foodType" placeholder="请选择菜品类型">
            <el-option label="可点" value="1"></el-option>
            <el-option label="售罄" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜品描述" prop="foodIntroduce">
          <el-input type="textarea" v-model="foodForm.foodIntroduce"></el-input>
        </el-form-item>
        <el-form-item label="菜品图片" prop="foodPhoto">
          <el-upload
            class="upload-img"
            :style="{backgroundImage:'url(' + foodForm.foodPhoto + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"
            action
            ::limit="1"
            :show-file-list="false"
            :on-change="handleChange"
            :before-upload="beforeUpload"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <i v-show="!foodForm.foodPhoto" class="el-icon-upload avatar-uploader-icon" />

            <div v-show="!foodForm.foodPhoto" slot="tip" class="el-upload__text upload__tip">上传照片</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('foodForm')">提交</el-button>
          <el-button @click="resetForm('foodForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addClose">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 菜品种类对话框 -->
    <el-dialog
      width="40%"
      title="菜品种类"
      :destroy-on-close="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="identifierDialogVisible"
    >
      <identifier-manage @refresh="refresh"></identifier-manage>
    </el-dialog>

    <!-- 为菜品种类添加菜品 -->
    <el-dialog
      :title="this.foodTitle"
      :visible.sync="addFoodTypeDialogVisible"
      width="30%"
      >
      <div class="add-food-type">
        <el-checkbox-group v-model="checkFoodTypeList">
          <el-checkbox :label="item.foodId" v-for="item in foodAllList" :key="item.foodId">{{item.foodName}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFoodTypeClose">取 消</el-button>
        <el-button type="primary" @click="addFoodTypeHandle">确 定</el-button>
      </span>
    </el-dialog>   

     <!-- 购物车对话框  -->
     <el-dialog
      title="购物车"
      :visible.sync="cartDialogVisible"
      width="60%">
        <div class="cart-container">
          <div v-if="!cartList" class="empty">
            购物车空空如也哦~
          </div>

          <div class="food-box" v-for="item in cartList" :key="item.foodId">
              <div class="food-describle">
                <img :src='item.foodPhoto' alt="">
                <div class="food-content">
                  <div class="food-title">{{item.foodName}}</div>
                  <div>¥：{{item.foodPrice}}</div>
                  <div class="food-introduce">{{item.foodIntroduce}}</div>
                </div>
              </div>
              <div class="cartNum">
                <el-tag style="margin-right:10px;font-size:18px;height:40px;">数量：{{item.foodNum}}</el-tag>
                <el-button-group>
                  <el-button type="primary" :disabled="item.foodNum===1" @click="cartCountChange(item.foodId,-1)">-1</el-button>
                  <el-button type="primary" @click="cartCountChange(item.foodId,+1)">+1</el-button>
                </el-button-group>
              </div>
          </div>

        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cartDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCart" :disabled="!cartList">下单</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
// import PublicPagination from '../../components/PublicPagination'
import IdentifierManage from '@/components/IdentifierManage'
export default {
  name: 'FoodList',
  components: {
    // PublicPagination,
    IdentifierManage
  },
  data () {
    return {
      userType: null,
      userId: this.$store.state.userInfo.id,
      activeName: '999999',
      identifierList: [], // 菜品种类列表
      keyword: '',
      foodAllList: [], // 全部菜品
      foodTypeList: [], // 获取各类菜品列表
      addDialogVisible: false, // 添加菜品对话框显示与隐藏
      foodTitle: '添加菜品',
      foodApi: api.ADDFOOD,
      foodImage: '', // 图片地址
      imageName: '', // 上传的图片名称
      // 添加、编辑菜品表单
      foodForm: {
        foodId: '',
        foodName: '',
        foodPrice: null,
        foodType: '',
        foodIntroduce: '',
        foodPhoto: ''
      },
      foodRules: {
        foodName: [
            { required: true, message: '请输入菜品名称', trigger: 'blur' }
        ],
        foodPrice: [
            { required: true, message: '请输入菜品价格', trigger: 'blur' }
        ],        
        foodType: [
            { required: true, message: '请输入菜品类型', trigger: 'change' }
        ],        
        foodIntroduce: [
            { required: true, message: '请输入菜品描述', trigger: 'blur' },
            { min: 5, max: 15, message: '长度在 5到 15 个字符', trigger: 'blur' }
        ],
        foodPhoto: [{ required: true, message: '请选择图片', trigger: 'blur' }]    
      },
      identifierDialogVisible: false, // 菜品种类的对话框
      addFoodTypeDialogVisible: false, // 为菜品种类添加菜品对话框
      checkFoodTypeList: [], // 为菜品种类添加菜品的多选
      cartDialogVisible: false, // 购物车对话框
      cartList: [] // 购物车菜品
    }
  },
  created () {
    this.getIdentifierList()
    this.getFoodList()
    this.getFoodTypeList()
    this.userType = window.sessionStorage.getItem('userType')
    this.cartList = JSON.parse(window.localStorage.getItem('cart')) || []
    // console.log(this.cartList)
  },
  methods: {

      handelSearch() {
        this.getFoodList()
      },

      handleClick(tab, event) {
        this.activeName = tab.name
         
        this.foodTypeList = []
        this.getFoodTypeList()
      },

      // 获取菜品种类列表
      getIdentifierList() {
        // 分页获取项目菜品种类
        httpUtil.post(api.SELECTALLFOODTYPE, {
          foodTypeName: ''
        }, (response) => {
          this.identifierList = response.data
        }, (error) => {
          const message = error.response.data.message
        })
      },

      // 获取全部菜品列表
      getFoodList() {
        httpUtil.get(api.SELECTALLFOOD, {
          foodName: this.keyword
        }, res=>{
          // console.log(res)
          this.foodAllList = res.data
        })
      },

      // 获取各类菜品列表
      getFoodTypeList() {
        httpUtil.get(api.SELECTFOODTYPELIST, {
          // foodName: this.keyword,
          foodTypeId: this.activeName
        }, res=>{
          // console.log(res)
          this.foodTypeList = res.data
        })
      },

      // 为菜品种类添加菜品的多选提交
      addFoodTypeHandle() {
        // console.log(this.checkFoodTypeList)
        httpUtil.get(api.FOODTYPESETFOOD, {
          foodTypeId: this.activeName,
          foodId: this.checkFoodTypeList
        }, res=>{
          this.$message.success('操作成功')
          this.getFoodTypeList()
        })
      },

      // 为菜品种类添加菜品的多选关闭
      addFoodTypeClose() {
        this.checkFoodTypeList = []
      },

      // 添加菜品
      addFood() {
        this.addDialogVisible = true
        this.foodTitle = '添加菜品'
        this.foodApi = api.ADDFOOD
      },

      // 修改菜品
      editFood(id) {
        this.addDialogVisible = true
        this.foodTitle = '添加菜品'
        this.foodApi = api.EDITFOOD
        const food = this.foodList.filter(item=>{
          return item.foodId === id
        })
        this.foodForm = food[0]
        // console.log(this.foodForm)
      },

      handleChange(file, fileList) {
        // console.log(file)
        this.imageName = file.name
        const isLt2M = file.size / 1024 / 1024 < 2
        if (isLt2M) {
          // uploadImgToBase64()返回一个Promise对象，通过.then()获取其数据。其中data.result是图片转成的base64值
          this.uploadImgToBase64(file.raw).then((data) => {
            this.foodForm.foodPhoto = data.result
          })
        } else {
          this.$message.error('上传图片大小不能超过 2MB!')
        }
      },
      uploadImgToBase64(file) {
        // 核心方法，将图片转成base64字符串形式
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function () {
            // 图片转base64完成后返回reader对象
            resolve(reader)
          }
          reader.onerror = reject
        })
      },
      beforeUpload(file) {
        return false
      },

      // 图片先访问接口
      async photoFild() {
        await httpUtil.post(api.FOODIMAGE, {
          name: this.imageName,
          base64: this.foodForm.foodPhoto
        }, res=>{
          // console.log(res.data)
          this.foodImage = res.data
          console.log(this.foodImage)
          this.foodForm.foodPhoto = this.foodImage
        })
      },

      // 表单提交
      submitForm() {
        this.$refs.foodFormRef.validate((valid) => {
          if (!valid) {
             
          } 
          // 先转换图片
          this.photoFild()

          // 再发送添加请求
          httpUtil.post(this.foodApi, {
            foodId: this.foodForm.foodId,
            foodName: this.foodForm.foodName,
            foodPrice: this.foodForm.foodPrice,
            foodType: this.foodForm.foodType,
            foodIntroduce: this.foodForm.foodIntroduce,
            foodPhoto: this.foodImage
          }, res=>{
            // console.log(this.foodForm.foodPhoto)
            // console.log(res)
            this.$message.success('操作成功')
            this.addDialogVisible = false
            this.foodForm = {
              foodId: '',
              foodName: '',
              foodPrice: null,
              foodType: '',
              foodIntroduce: '',
              foodPhoto: undefined
            }
            this.getFoodList()
          })
        })
      },

      refresh() {
        this.getFoodList()
      },

      // 表单重置
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },

      // 对话框关闭
      addClose() {
        this.addDialogVisible = false
        this.foodForm = {
          foodId: '',
          foodName: '',
          foodPrice: null,
          foodType: '',
          foodIntroduce: '',
          foodPhoto: undefined
        }
      },

      // 删除菜品
      deleteFood(id) {

      },

      // 加入购物车
      handleAddCart(id) {
        // 当前加入购物车的菜品
        const lists = this.foodAllList.filter(item=>{
          if (item.foodId === id) {
            return item 
          }
        })
        
        // 如果购物车不为空 查看购物车中是否有该菜品
        if (this.cartList) {
          const idx = this.cartList.findIndex(item=>{
            return item.foodId === lists[0].foodId
          })
          if (idx !== -1) {
              this.cartList = this.cartList.map(item=>{
                if (item.foodId === id) {
                  item.foodNum += 1
                }
                return item
              })
              return
          }
        }
        // 先把数量初始成1
        lists[0].foodNum = 1
        this.cartList = this.cartList.concat(lists)
        
        console.log(this.cartList)
        window.localStorage.setItem('cart', JSON.stringify(this.cartList))
        this.$message.success('加入购物车成功')
      },

      // 购物车菜品数量变化
      cartCountChange(id, num) {
        this.cartList = this.cartList.map(item=>{
          if (item.foodId === id) {
            item.foodNum += num
          }
          return item
        })

        window.localStorage.setItem('cart', this.cartList)
        // this.$message.success('菜品数量修改成功')
      },

      // 下单
      handleCart() {
        console.log(this.userId)
        httpUtil.post(api.USERORDERXIADAN, {
          orderFoods: this.cartList,
          userId: this.userId
        }, res=>{
          console.log(res)
          this.$message.success('下单成功')
          this.cartDialogVisible = false
        })
      }

  }
}
</script>

<style lang="less" scoped>
.food-list {

  .searchBox {
    background: #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 5px;

    .searchBtn {
      margin-left: 20px;
    }

    .btn-box {
      float: right;
    }
  }

  .food-container {
    .btn-btm2 {
      margin-bottom: 20px;
    }
    .food-box {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 5px;
      margin-bottom: 20px;

      .food-describle {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 5px;
        // height: 200px;
        img {
          width: 40%;
          // height: 100%;
        }
        .food-content {
          width: 60%;
          color: #2C3E50;
          font-size: 16px;
          padding: 5px;
          text-align: left;
          .food-title {
            color: #A52A2A;
            font-size: 20px;
            margin: 8px 0;
          }
          .food-introduce {
            color: #404040;
            margin: 5px 0;
            height: 80px;
          }
        }
      }
  
      .cart {
        text-align: center;
        .cartBtn {
          margin-right: 20px;
        }
      }
    }
  }

  .cart-container {
    .empty {
      font-size: 20px;
      text-align: center;
    }
    .food-box {
      border: 1px solid #ccc;
      border-radius: 10px;
      padding: 5px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .food-describle {
        display: flex;
        justify-content: space-evenly;
        margin-bottom: 5px;
        width: 70%;
        img {
          width: 40%;
          // height: 100%;
        }
        .food-content {
          width: 60%;
          color: #2C3E50;
          font-size: 16px;
          padding: 5px;
          text-align: left;
          .food-title {
            color: #A52A2A;
            font-size: 20px;
            margin: 8px 0;
          }
          .food-introduce {
            color: #404040;
            margin: 5px 0;
            height: 80px;
          }
        }
      }

      .cartNum {
        float: right;
        width: 30%;
        text-align: center;
        
      }
    }

  }
}
</style>
<style >
  .food-list .el-form-item__content {
    margin-left: 80px !important;
  }
</style>
