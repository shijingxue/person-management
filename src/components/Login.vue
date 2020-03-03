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
          <el-input v-model="loginlist.userName" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            v-model="loginlist.userPassword"
            prefix-icon="el-icon-lock"
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
          <el-button type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from './minix/Identify'
export default {
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
        userPassword: [{ required: true, message: '请输入登录密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
         code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  // 注册局部组件
  components: {
  'Identify': Identify
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
      this.$refs.loginFormRef.validate(async valid => {
        //  如果验证参数为true就通过
        if (!valid) {
          return
        }
        const { data: res } = await this.$http.post('login', {
          userName: this.loginlist.userName,
          userPassword: this.loginlist.userPassword })
        // console.log('返回的数据', res)
        // console.log('返回的数据', res.code)
        if (res.code !== '200') {
          return this.$message.error('登录失败')
        }
        this.$message.success('登录成功')
        // console.log(111)
        //  保存token
        window.sessionStorage.setItem('token', res.data.token)
        //  导航值home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #0c419b;
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
</style>
