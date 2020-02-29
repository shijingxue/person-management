<template>
  <div>
    <!-- 部门职位管理 -->
    <Mix nav1='部门管理' nav2='部门职位管理'></Mix>

    <!-- 对话框 -->
    <el-card>
      <!-- 添加职位 -->
      <el-button class="addPosition" type="primary" @click="addThePosition">新增职位</el-button>
      <el-table
      :data="positionList"
      style="width: 100%" border stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="bzId" label="职位id" ></el-table-column>
      <el-table-column prop="bzName" label="职位名" ></el-table-column>
      <el-table-column prop="bzPay" label="职位薪资" ></el-table-column>
      <el-table-column prop="bName" label="部门名" ></el-table-column>
      <el-table-column prop="bId" label="部门id" ></el-table-column>
      <el-table-column label="操作" >
        <!-- 新增  修改 删除   修改只能修改底薪 -->
        <template slot-scope="scope">
         <el-button size="mini" icon="el-icon-edit" type="warning" @click="editPosition(scope.row)">修改</el-button>
         <el-button size="mini" icon="el-icon-delete" type="danger" @click="deletePosition(scope.row)">删除</el-button>
        </template>
      </el-table-column>
     </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="this.queryinfo.current"
        :page-sizes="[2, 5, 10,15]"
        :page-size="queryinfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!--添加职位 对话框 -->
      <el-dialog
        title="新增职位"
        :visible.sync="IsAddPositionVisible"
        width="50%"
        @close='closeAddDialog'>
        <!-- 表单 -->
        <el-form :model="AddPositionList" :rules="AddPositionRules" ref="AddFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="部门名" prop="bName" >
            <el-select v-model="AddPositionList.bName" placeholder="请选择部门" @change="getTheId(AddPositionList.bName)">
              <div v-for='item in branchList' :key='item.bId'>
               <el-option :label="item.bName" :value="item.bName" ></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="职位名" prop="bzName">
            <el-input v-model="AddPositionList.bzName"></el-input>
          </el-form-item>
          <el-form-item label="职位id" prop="bzId">
            <el-input v-model="AddPositionList.bzId"></el-input>
          </el-form-item>
          <el-form-item label="职位薪资" prop="bzPay">
            <el-input v-model="AddPositionList.bzPay"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="IsAddPositionVisible = false">取 消</el-button>
          <el-button type="primary" @click="addPositionBtn">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改职位信息对话框 -->
      <el-dialog
        title="修改职位信息"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="closeEdit">
        <!-- 表单 -->
        <el-form :model="editInfoList" :rules="editRules" ref="editFormRef" label-width="100px" class="demo-ruleForm">
          <el-form-item label="部门id" prop="bId" >
            <el-input disabled v-model="editInfoList.bId"></el-input>
          </el-form-item>
          <el-form-item label="部门名" prop="bName">
            <el-input disabled v-model="editInfoList.bName"></el-input>
          </el-form-item>
          <el-form-item label="职位id" prop="bzId">
            <el-input disabled v-model="editInfoList.bzId"></el-input>
          </el-form-item>
          <el-form-item label="职位名" prop="bzName">
            <el-input disabled v-model="editInfoList.bzName"></el-input>
          </el-form-item>
          <el-form-item label="职位薪资" prop="bzPay">
            <el-input v-model="editInfoList.bzPay"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editTrueBtn">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 职位信息列表
      positionList: [],
      // 分页数据
      queryinfo: {
        current: 1,
        size: 10
      },
      total: 0,
      // 新增职位按钮显示和隐藏
      IsAddPositionVisible: false,
      // 部门职位列表
      branchList: [],
      // 新增职位列表
      AddPositionList: {
        bId: null,
        bName: '',
        bzName: '',
        bzId: null,
        bzPay: null
      },
      // 规则
      AddPositionRules: {
        bName: [
            { required: true, message: '请选择部门', trigger: 'change' }
        ],
        bzName: [
            { required: true, message: '请输入职位名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        bzPay: [
            { required: true, message: '请输入职位薪资', trigger: 'blur' }
        ]
      },
      // 当前点击的修改的职位信息
      editInfoList: {
        bId: null,
        bName: '',
        bzName: '',
        bzPay: null
      },
      // 修改对话框的显示和隐藏
      editDialogVisible: false,
      // 修改部门职位的规则
      editRules: {
        bzPay: [
           { required: true, message: '请输入职位薪资', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // 获取职位信息
    this.getPosition()
    // 获取部门职位信息
    this.getBranch()
  },
  methods: {
    async getPosition() {
      const { data: res } = await this.$http.get('position/selectAll', { params: this.queryinfo })
      // console.log(res)
      if (res.code !== '200') {
        return this.$message.error('获取职位信息失败')
      }
      this.$message.success('获取职位信息成功')
      this.positionList = res.data.records
      this.total = res.data.total
    },
    // 监听页面size变化
    handleSizeChange(newsize) {
      this.queryinfo.size = newsize
      this.getPosition()
    },
    // 监听当前页面的变化
    handleCurrentChange(newPage) {
      this.queryinfo.current = newPage
      this.getPosition()
    },
    // 点击新增职位按钮
    addThePosition() {
      this.IsAddPositionVisible = true
    },
    // 关闭添加职位对话框
    closeAddDialog() {
      this.branchList = {}
    },
    // 获取部门信息
    async getBranch() {
      const { data: res } = await this.$http.get('brach/selectAll')
      // console.log('部门信息', res)
      if (res.code !== '200') {
        return this.$message.error('获取部门信息失败')
      }
      this.branchList = res.data
      // console.log(res.data)
    },
    // 确定添加职位按钮
    addPositionBtn() {
      // 先对输入的内容进行校验
      this.$refs.AddFormRef.validate(async valid => {
        if (!valid) {
          return 
        }
        // 发送请求  增加职位
        const { data: res } = await this.$http.post('position/add', this.AddPositionList)
        // console.log(res)
        if (res.code !== '200') {
          return this.$message.error('新增职位失败')
        }
        this.$message.success('新增职位成功')
        this.getPosition()
      })
    },
    // 修改职位信息 按钮
    editPosition(info) {
      this.editDialogVisible = true
      this.editInfoList = info
      // console.log(this.editInfoList)
    },
    // 修改对话框关闭时
    closeEdit() {
      this.positionInfo = {}
    },
    // 点击确定修改按钮时
    async editTrueBtn() {
      const { data: res } = await this.$http.post('position/update', this.editInfoList)
      // console.log(res)
      
      // 把对话框关闭
      this.editDialogVisible = false
    },
    // todo 点击删除职位时
    async deletePosition(info) {
      const result = await this.$confirm('确定要删除此职位?', '提示', {
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
      // 发送请求删除职位
      const { data: res } = await this.$http.post('position/delete', info)
      // console.log(res)
      if (res.code !== '200') {
        return this.$message.error('删除职位失败')
      }
      this.$message.success('删除职位成功')
      // 判断当前行的数据是否为1，为0就跳转到前一页
      if (this.queryInfo.current !== 1) {
          if (this.branchList.length === 1) {
            this.queryInfo.current -= 1
          }
      }
      this.getPosition()
    },
    // 获取所选部门的id
    getTheId(name) {
      const id = this.branchList.filter(item=>{
        if (item.bName === name) {
          return item.bId
        }
      })
      this.AddPositionList.bId = id[0].bId
      // console.log(this.AddPositionList.bId)
    }
  }
}
</script>

<style lang="less" scoped>
.addPosition {
  margin-bottom: 20px;
}
.el-input {
  width: 70%;
}
</style>
