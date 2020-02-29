<template>
  <div>
    <!-- 面包屑导航 -->
    <Mix nav1="部门管理" nav2="部门信息管理" ></Mix>
    <!-- 卡片 -->
    <el-card class="box-card">
        <!-- 添加部门 -->
        <el-button class="addBranch" icon="el-icon-plus" type="primary" @click="addBranch">添加部门</el-button>
        <!-- 表格 -->
        <el-table
          :data="branchList"
          style="width: 100%" stripe border>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="bId" label="部门编号"></el-table-column>
          <el-table-column prop="bName" label="部门名称"></el-table-column>
          <el-table-column prop="bCount" label="部门人数"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
             <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteTheBranch(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="SizeChange"
            @current-change="CurrentChange"
            :current-page="queryInfo.current"
            :page-sizes="[2,5,10]"
            :page-size="queryInfo.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>

        <!-- 添加部门时的对话框 -->
        <el-dialog
          title="添加部门"
          :visible.sync="IsdialogVisible"
          width="50%"
          @close='closeAddForm'>
          <!-- 添加时的表单 -->
          <el-form :rules="addBranchrules" ref="addRuleFormRef"  :model="addBranchList" label-width="80px" class="demo-ruleForm">
              <el-form-item prop="bName" label="部门名称">
                <el-input v-model="addBranchList.bName"></el-input>
              </el-form-item>
              <el-form-item prop="bCount" label="部门人数">
                <el-input v-model="addBranchList.bCount"></el-input>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="IsdialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="toAddBranchNews">添加</el-button>
          </span>
        </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 部门列表
      branchList: [],
      // 总部门数
      total: 0,
      // 分页数据
      queryInfo: {
        current: 1,
        size: 5
      },
      // 添加部门对话框显示和隐藏
      IsdialogVisible: false,
      // 添加部门列表数据
      addBranchList: {
        bName: '',
        bCount: null
      },
      // 添加部门信息的验证规则
      addBranchrules: {
        bName: [
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2到 10 个字符', trigger: 'blur' }
          ],
        bCount: [
           { required: true, message: '请输入部门人数', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 获取部门信息
    this.getbranchList()
  },
  methods: {
    async getbranchList() {
      const { data: res } = await this.$http.get('brach/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
        return this.$message.error('获取部门信息失败')
      }
      this.$message.success('获取部门信息成功')
      this.branchList = res.data.records
      this.total = res.data.total
      // console.log(this.total)
    },
    // 监听页面大小变化   然后重新渲染
    SizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getbranchList()
    },
    // 监听页码值得变化  然后重新渲染
    CurrentChange(newnum) {
      this.queryInfo.current = newnum
      this.getbranchList()
    },
    // 关闭对话框时  清空所有数据
    closeAddForm() {
      this.addBranchList = {}
    },
    // 添加部门按钮
    addBranch() {
      // 弹出对话框
      this.IsdialogVisible = true
    },
    // 确定添加部门按钮
    toAddBranchNews() {
      // 在发送请求之前 进行数据验证
      this.$refs.addRuleFormRef.validate(async valid => {
        // 数据验证为true就通过
        if (!valid) {
          return
        }
      const { data: res } = await this.$http.post('brach/addBranch', {
        'bName': this.addBranchList.bName,
        'bCount': JSON.parse(this.addBranchList.bCount)
      })
      // console.log(res)
      if (res.code !== '200') {
        return this.$message.error('添加部门失败')
      }
      this.$message.success('添加部门成功')
      this.IsdialogVisible = false
      this.getbranchList()
      })
    },
    // 删除部门按钮
    async deleteTheBranch(info) {
      if (info.bCount !== 0) {
        return this.$message.error('部门人数不为0，不能删除哦~')
      }
      const result = await this.$confirm('确定要删除此部门？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        //  进行错误拦截 把错误返回
        return err
      })
      if (result !== 'confirm') {
        return this.$message.info('您已经取消了删除')
      }
      // 发送请求删除部门
      const { data: res } = await this.$http.post('brach/deleteBranch', info)
      // console.log(res)
      this.$message.success('删除部门成功')
      // 判断当前行的数据是否为1，为0就跳转到前一页
      if (this.queryInfo.current !== 1) {
          if (this.branchList.length === 1) {
            this.queryInfo.current -= 1
          }
      }
      this.getbranchList()
    }
  }
}
</script>

<style lang="less" scoped>
.addBranch {
  margin-bottom: 20px;
}
.el-input {
  width: 70%;
}
</style>
