<template>
  <div class='change-pwd'>
    <Mix nav1='用户管理' nav2='修改密码'></Mix>

    <el-card>
       <!-- 修改密码表单 -->
      <div class="box_right">
        <el-form :model="userInfo" :rules="userInfoRules" ref="userInfoRef" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="userPassword">
            <el-input v-model="userInfo.userPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="用户真实姓名" prop="userRealname">
            <el-input v-model="userInfo.userRealname"></el-input>
          </el-form-item>
          <el-form-item label="用户类别" prop="userType">
            <el-select v-model="userInfo.userType" placeholder="请选择用户类别">
            <el-option v-if="this.$store.state.type == 1" label="超级管理员" value="1" ></el-option>
            <el-option v-else label="普通用户" value="0" ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="" class="btn_form">
          <el-button type="primary" @click="submitForm()">修改密码</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
export default {
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 修改密码规则
      userInfoRules: {
        userName: [
           { required: true, message: '请输入用户账号', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        userPassword: [
           { required: true, message: '请输入用户密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }         
        ],
        userRealname: [
           { required: true, message: '请输入用户真实姓名', trigger: 'blur' }
        ],
        userType: [
           { required: true, message: '请选择用户类别', trigger: 'blur' }
        ]
      },
      // 提示用户密码对话框显示和隐藏
      dialogVisible: false
    }
  },
  created () {
    this.userInfo = this.$store.state.userInfo
    this.userInfo.userPassword = ''
  },
  methods: {

      // 修改密码
      submitForm() {
        this.$refs.userInfoRef.validate(async valid =>{
          if (!valid) {
          return 
          }
          httpUtil.post(api.UPDATEPASSWORD, this.userInfo, res=>{
            // console.log(res)
             if (res.status !== 200) {
              return this.$message.error('修改密码失败')
             }
            this.userInfo = {}
            this.$message.success('修改密码成功,请重新登录')

            window.sessionStorage.clear('token')
            this.$router.push('/login')
            this.$store.commit('setType', null)
          })
         })
      }
  }
}
</script>

<style lang="less" scoped>
  .change-pwd {

    .box_right {
      width: 800px;
      margin: 20px auto;
    }
  }
</style>

<style >
  .change-pwd .el-form-item__content {
    margin-left: 120px !important;
  }
</style>
