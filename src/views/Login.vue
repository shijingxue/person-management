<template>
  <div class="login_container">
    <div class="box">
      <!-- 用户头像 -->
      <div class="avatar_box">
        <img src="../assets/18.jpg" alt />
      </div>
      <!-- 表单 -->
      <el-form
        :model="loginlist"
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="100px"
        class="demo-ruleForm user_form"
      >
        <el-form-item prop="userName">
          <el-input v-model="loginlist.userName" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            v-model="loginlist.userPassword"
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="code">
          <el-input type="text" v-model="loginlist.code" placeholder="- - - -" class="code_ipt">
           <template slot="prepend">验证码</template>
           <template slot="append">
            <div class="login-code" @click="refreshCode">
             <Identify :identifyCode="identifyCode"></Identify>
            </div>
           </template>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginBtn">登录</el-button>
          <el-button type="info"  @click="resset">重置</el-button>
          <span class="set-user" @click="UserDialogVisible= !UserDialogVisible">注册新用户</span>
        </el-form-item>
      </el-form>
    </div>

    <!-- 注册新用户对话框 -->
    <el-dialog
      title="注册用户"
      class="userDialog"
      :visible.sync="UserDialogVisible"
      width="40%">
      <user-set :utype="0"></user-set>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UserDialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="UserDialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Identify from '../components/minix/Identify'
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
import UserSet from '../components/UserSet.vue'
export default {
  name: 'Login',
  data() {
    return {
      identifyCodes: '1234567890abcdefjhijklinopqrsduvwxyz',
      identifyCode: '',
      //  用户名和密码
      loginlist: {
        userName: '',
        userPassword: '',
        code: ''
      },
      //   规则
      loginFormRules: {
        userName: [{ required: true, message: '请输入账户名', trigger: 'blur' }, { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }],
        userPassword: [{ required: true, message: '请输入登录密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
        //  code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      UserDialogVisible: false // 注册用户对话框
    }
  },
  // 注册局部组件
  components: {
  'Identify': Identify,
  UserSet
  },
  created() {
      // 初始化验证码
  this.identifyCode = ''
  this.makeCode(this.identifyCodes, 4)
  },
  methods: {
    // 重置验证码
    refreshCode () {
     this.identifyCode = ''
     this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
     for (let i = 0; i < l; i++) {
      this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
     }
    },
    randomNum (min, max) {
     return Math.floor(Math.random() * (max - min) + min)
    },
    //   登录
    loginBtn() {
      if (this.loginlist.code.toLowerCase() !== this.identifyCode.toLowerCase()) {
       this.$message.error('请填写正确验证码')
       this.refreshCode()
       return
      }
      // 在登陆前 先验证表单内容填写是否有误
      this.$refs.loginFormRef.validate(valid => {
        //  如果验证参数为true就通过
        if (!valid) {
          return
        }
        httpUtil.post(api.LOGIN, {
          userName: this.loginlist.userName,
          userPassword: this.loginlist.userPassword }, res=>{
            const data = res.data
            window.sessionStorage.setItem('saveUserInfo', JSON.stringify(res.data))
            this.$store.dispatch('saveUserInfo', res.data)

            this.$store.commit('setType', data.userType)
            this.$message.success('登录成功')
            //  保存token
            window.sessionStorage.setItem('userType', res.data.userType)
            this.go()
          }, (error)=>{
            const message = error.response.data.message
            // this.$message.error(error)
          })
      })
    },

    go() {
      //  导航值home
      this.$router.push('/home', onAbort => { })
    },

    // 重置表单
    resset() {
      this.$refs.loginFormRef.resetFields()
    }

  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  // background-color: #0c419b;
  background: url(../assets/zhihu.png) no-repeat center;
}
.box {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 370px;
  background-color: #fff;
  border-radius: 8px;
}
.avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 1px solid #eee;
  box-shadow: 0 0 10px #ddd;
  padding: 8px;
  background-color: #fff;
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.user_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  width: 100%;
  padding: 0 20px;
  text-align: center;
  input {
    width: 100%;
  }
}
.code_ipt{
  height: 45px;
}

.set-user {
  color: rgb(168, 164, 164);
  border-bottom: 1px solid rgb(110, 104, 104);
  margin-left: 10px;
  cursor: pointer;
}

</style>
<style>
.login_container .userDialog .el-form-item__content{
    margin-left: 120px !important;
  }
</style>
