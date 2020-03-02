<template>
  <div>
    <!-- 面包屑导航 -->
    <Mix nav1='奖惩管理' nav2='奖惩信息管理'></Mix>
    <el-card>
      <!-- 新增奖惩信息 -->
       <el-button class="addEmployee" icon="el-icon-plus" type="primary" @click="addReward">新增奖惩信息</el-button>
       <el-table
        :data="rewardsList"
        style="width: 100%" border stripe>
        <el-table-column type="expand">
        <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="奖惩信息表id:">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="员工名称:">
            <span>{{ props.row.yName }}</span>
          </el-form-item>
          <el-form-item label="员工编号:">
            <span>{{ props.row.yNum }}</span>
          </el-form-item>
          <el-form-item label="奖惩信息编号:">
            <span>{{ props.row.jNum }}</span>
          </el-form-item>
          <el-form-item label="奖惩类别:">
            <el-tag v-if="props.row.jGenre===1" type="success">奖励</el-tag>
            <el-tag v-else type="danger">惩罚</el-tag>
          </el-form-item>
          <el-form-item label="奖惩原因:">
            <span>{{ props.row.jCause }}</span>
          </el-form-item>
          <el-form-item label="奖惩金额:">
            <span>{{ props.row.jPrice }}</span>
          </el-form-item>
          <el-form-item label="奖惩创建时间:">
            <span>{{ props.row.jTime || moment }}</span>
          </el-form-item>
          <el-form-item label="其他奖惩:">
            <span>{{ props.row.jQita }}</span>
          </el-form-item>
        </el-form>
        </template>
        </el-table-column>
        <el-table-column
          label="员工名称"
          prop="yName">
        </el-table-column>
        <el-table-column
          label="员工编号"
          prop="yNum">
        </el-table-column>
        <el-table-column
          label="奖惩类别"
          prop="jGenre">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.jGenre === 1" type="success">奖励</el-tag>
            <el-tag v-else-if="scope.row.jGenre === 2" type="danger">惩罚</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="奖惩 金额"
          prop="jPrice">
        </el-table-column>
        <el-table-column
          label="奖惩原因"
          prop="jCause">
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.current"
        :page-sizes="[5, 7, 10]"
        :page-size="queryInfo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
     </el-pagination>

     <!-- 新增奖惩信息对话框 -->
     <el-dialog
        title="新增奖惩信息"
        :visible.sync="rewadsDialogVisible"
        width="30%"
        @close="closeRewards">
        <!-- 表单 -->
        <el-form :model="addRewardList" :rules="addRewardRules" ref="addRewardsRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工名称" prop="yName">
          <el-select v-model="addRewardList.yName" placeholder="请选择员工名称" @change="getNum(addRewardList.yName)">
            <div v-for="item in employeeList" :key='item.id'>
            <el-option :label="item.yName" :value="item.yName"></el-option>
            </div>
          </el-select>
        </el-form-item>
        <el-form-item label="员工编号" prop="yNum">
          <el-input v-model="addRewardList.yNum"></el-input>
        </el-form-item>
        <el-form-item label="奖惩类别" prop="jGenre">
          <el-select v-model="addRewardList.jGenre" placeholder="请选择奖惩类别      ">
            <el-option label="奖励" value="1"></el-option>
            <el-option label="惩罚" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="奖惩原因" prop="jCause">
          <el-input v-model="addRewardList.jCause"></el-input>
        </el-form-item>
        <!-- <el-form-item label="奖惩信息编号" prop="jNum">
          <el-input v-model="addRewardList.jNum"></el-input>
        </el-form-item> -->
        <el-form-item label="奖惩金额" prop="jPrice">
          <el-input v-model="addRewardList.jPrice"></el-input>
        </el-form-item>
        <el-form-item label="其他奖惩" prop="jQita">
          <el-input v-model="addRewardList.jQita"></el-input>
        </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rewadsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRewardBtn">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rewardsList: [],
      queryInfo: {
        current: 1,
        size: 10
      },
      total: 0,
      // 新增奖惩信息对话框 显示和隐藏
      rewadsDialogVisible: false,
      // 所有员工信息
      employeeList: [],
      // 新增时的信息
      addRewardList: {
        yName: '',
        yNum: null,
        jGenre: null,
        jCause: '',
        // jNum: '',
        jPrice: null,
        jQita: ''
      },
      addRewardRules: {
        yName: [
          { required: true, message: '请选择员工名称', trigger: 'blur' }
        ],
        jGenre: [
            { required: true, message: '请输入奖惩类别', trigger: 'blur' }
        ],
        jCause: [
            { required: true, message: '请输入奖惩原因', trigger: 'blur' }
        ],
        jPrice: [
           { required: true, message: '请输入奖惩金额', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getRewards()
    this.getallEmp()
  },
  methods: {
    async getRewards() {
      const { data: res } = await this.$http.get('RPI/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取奖惩信息失败')
      }
      // this.$message.success('获取奖惩信息成功')
      this.rewardsList = res.data.records
      this.total = res.data.total
    },
    // 监听分页size变化
    handleSizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getRewards()
    },
    // 监听页面current变化
    handleCurrentChange(newpage) {
      this.queryInfo.current = newpage
      this.getRewards()
    },
    // 点击新增奖惩信息按钮
    addReward() {
      this.rewadsDialogVisible = true
    },
    // 对话框关闭
    closeRewards() {
      this.addRewardList = {}
    },
    // 确定新增按钮
    addRewardBtn() {
      // 先判断输入信息是否符合要求
      this.$refs.addRewardsRef.validate(async valid => {
        if (!valid) {
          return 
        }
        const { data: res } = await this.$http.post('RPI/add', this.addRewardList)
        // console.log(res)
        if (res.code !== '200') {
          return this.$message.error('添加奖惩信息失败')
        }
        this.$message.success('添加奖惩信息成功')
        this.getRewards()
      })
      this.rewadsDialogVisible = false
    },
    // 查询所有员工
    async getallEmp() {
      const { data: res } = await this.$http.get('employee/selectAll')
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取员工信息失败')
      }
      this.employeeList = res.data
    },
    // 获取所选员工的编号
    getNum(yname) {
      const ynum = this.employeeList.filter(item=>{
        if (item.yName === yname) {
          return item.yNum
        }
      })
      this.addRewardList.yNum = ynum[0].yNum
      // console.log(this.addRewardList.yNum)
    }
  }
}
</script>

<style lang="less" scoped>
.addEmployee {
  margin-bottom: 20px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-input {
  width: 70%;
}
</style>
