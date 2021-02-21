<template>
  <div class='user-set'>
       <!-- 新增用户表单 -->
      <div class="box_right">
        <!-- <el-button class="addUsers" icon="el-icon-plus"   type="primary" @click="addUsers">新增用户</el-button> -->
        <!-- 表单 -->
        <el-form :model="addUsersList" :rules="addUsersListRules" ref="addUsersListRef" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户账号" prop="userName">
            <el-input v-model="addUsersList.userName"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="userPassword">
            <el-input v-model="addUsersList.userPassword"></el-input>
          </el-form-item>
          <el-form-item label="用户真实姓名" prop="userRealname">
            <el-input v-model="addUsersList.userRealname"></el-input>
          </el-form-item>
          <el-form-item label="用户类别" prop="userType">
            <el-select v-model="addUsersList.userType" placeholder="请选择用户类别">
            <el-option v-if="utype===1" label="超级管理员" value="1" ></el-option>
            <el-option v-else label="普通用户" value="0" ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="" class="btn_form">
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
  </div>
</template>

<script>
import api from '@/api/index'
import httpUtil from '@/utils/http-util'
export default {
  name: 'UserSet',
  props: {
    utype: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      addUsersList: {},
      // 新增用户规则
      addUsersListRules: {
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
      }
    }
  },
  created () {
    // console.log(this.utype)
  },
  methods: {
    // 重置表单
     resetForm() {
        this.$refs.addUsersListRef.resetFields()
      },
      // 新增用户
      submitForm() {
        this.$refs.addUsersListRef.validate(async valid =>{
          if (!valid) {
          return 
          }
          httpUtil.post(api.ADDUSERS, this.addUsersList, res=>{
            // console.log(res)
             if (res.status !== 200) {
              return this.$message.error('新增用户失败')
             }
            this.$message.success('新增用户成功')
            // this.getUsers()
            this.addUsersList = {}
          })
         })
      }
  }
}
</script>

<style lang="less" scoped>
  .new-user {

    .box_right {
      width: 800px;
      margin: 20px auto;
    }
  }
</style>

<style >
  .new-user .el-form-item__content {
    margin-left: 120px !important;
  }
</style>
