<template>
  <div>
    
    <Mix nav1='用户管理' nav2='用户信息管理'></Mix>
    <el-card>

      <!-- 用户信息渲染 -->
       <el-table
          :data="usersList"
          style="width: 50%" border stripe>
          <el-table-column  prop="id"  label="用户id"></el-table-column>
          <el-table-column  prop="userNum"  label="用户编号"  ></el-table-column>
          <el-table-column  prop="userName"  label="用户账号"  ></el-table-column>
          <el-table-column  prop="userPassword"  label="用户密码">
            <template slot-scope="scope">
              <div v-if="scope.row.userPassword">******</div>
            </template>
          </el-table-column>
          <el-table-column  prop="userRealname"  label="用户真实姓名"></el-table-column>
          <el-table-column  prop="userType"  label="用户类别">
            <template slot-scope="scope">
              <div v-if="scope.row.userType===1">超级管理员</div>
              <div v-else>普通用户</div>
            </template>
          </el-table-column>
          <el-table-column width="220px" label="操作">
            <template slot-scope="scope">
             <el-button icon="el-icon-edit" size="mini" type="warning" @click="resetUserPwd(scope.row)">重置密码</el-button>
             <el-button icon="el-icon-delete" size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
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
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="普通用户" value="0" selected></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="" class="btn_form">
          <el-button type="primary" @click="submitForm()">新增用户</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 重置密码完成后弹出对话框 告诉用户 密码重置为123456 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <span>密码重置成功，新密码为:123456 </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usersList: [],
      // 新增用户表单
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
      },
      // 提示用户密码对话框显示和隐藏
      dialogVisible: false
    }
  },
  created () {
    this.getUsers()
  },
  methods: {
    async getUsers() {
      const { data: res } = await this.$http.get('user/selectAll')
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取用户信息失败')
      }
      // this.$message.success('获取用户信息成功')
      this.usersList = res.data
    },
    // 新增用户按钮
    // addUsers() {

    // }
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
          const { data: res } = await this.$http.post('user/addUser', this.addUsersList)
          // console.log(res)
           if (res.code !== '200') {
          return this.$message.error('新增用户失败')
           }
          this.$message.success('新增用户成功')
          this.getUsers()
          this.addUsersList = {}
         })
      },
      // 重置密码
      async resetUserPwd(row) {
        const { data: res } = await this.$http.post('user/chonghzhi', row)
        // console.log(res)
        if (res.code !== '200') {
          return this.$message.error('重置密码失败')
        }
        // this.$message.success('重置密码成功')
        this.getUsers()
        this.dialogVisible = true
      },
      // 删除用户
      async deleteUser(row) {
      const result = await this.$confirm('确定要删除此用户?', '提示', {
        confirmButtonText: '确定',
        concelmButtonText: '取消',
        type: 'warning'
      }).catch(err=> {
        // 进行错误拦截
        return err
      }) 
      if (result !== 'confirm') {
        return this.$message.info('您已经取消删除')
      }
        const { data: res } = await this.$http.post('user/delete', row)
        console.log(res)
         if (res.code !== '200') {
          return this.$message.error('用户删除失败')
        }
        this.$message.success('用户删除成功')
        this.getUsers()
      }
  }
}
</script>

<style lang="less" scoped>
.addUsers {
  margin-bottom: 30px;
  float: left;
}
.el-table {
  float: left;
  margin-bottom: 20px;
  text-align: center;
}
.box_right {
  float: right;
  width: 800px;
  // border: 1px solid #000;
  // text-align: center;
}
.el-input {
  width: 50%;
}
.btn_form {
  margin-left: 350px;
  // float: right;
}
</style>
