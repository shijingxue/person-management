<template>
  <div>
    <Mix nav1='职员管理' nav2='员工信息管理'></Mix>
    <!-- 员工信息表格 -->
    <el-card>
      <!-- 新增员工 -->
      <el-button class="addEmployee" icon="el-icon-plus" type="primary" @click="addEmployee">新增员工</el-button>
      <el-table
    :data="clerkList"
    style="width: 100%" border stripe>
      <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="员工姓名：">
            <span>{{ props.row.yName }}</span>
          </el-form-item>
          <el-form-item label="员工 ID：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="员工性别：">
            <span>{{ props.row.ySex === 1 ? "男": "女"}}</span>
          </el-form-item>
          <el-form-item label="员工职位：">
            <span>{{ props.row.bzName }}</span>
          </el-form-item>
          <el-form-item label="员工职位id：">
            <span>{{ props.row.pId }}</span>
          </el-form-item>
          <el-form-item label="员工所属部门：">
            <span>{{ props.row.bName }}</span>
          </el-form-item>
          <el-form-item label="员工入职时间：">
            <span>{{ props.row.yDate || moment }}</span>
          </el-form-item>
          <el-form-item label="员工状态：">
            <span>{{ props.row.yState === 1? '正式员工': (props.row.yState === 0?'离职':'实习')}}</span>
          </el-form-item>
          <el-form-item label="员工月薪：">
            <span>{{ props.row.yPrice }}</span>
          </el-form-item>
          <el-form-item label="员工身份证号：">
            <span>{{ props.row.card }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
      <el-table-column
      label="员工 ID"
      prop="id">
      </el-table-column>
      <el-table-column
        label="员工姓名"
        prop="yName">
      </el-table-column>
      <el-table-column
        label="员工职位"
        prop="bzName">
      </el-table-column>
      <el-table-column
        label="员工所属部门"
        prop="bName">
      </el-table-column >
      <!-- <template slot-scope="scope"> -->
      <el-table-column
        label="员工状态"
        prop="yState">
        <!-- {{scope.row.yState === 1 ? '正式员工': '实习'}} -->
        <template slot-scope="scope">
          <div v-if='scope.row.yState===1'>正式员工</div>
          <div v-else-if='scope.row.yState===2'>实习</div>
          <div v-else-if='scope.row.yState===0'>离职</div>
        </template>
      </el-table-column >
      <!-- </template> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
        <!-- 修改 员工职位 部门 月薪 状态 -->
        <div v-if='scope.row.yState===0'>
         <el-button class="remove_btn" size="mini" disabled icon="el-icon-edit" type="warning" @click="editEmployee(scope.row)">修改</el-button>
         <el-button class="remove_btn" size="mini" disabled icon="el-icon-delete" type="danger" @click="changeStatus(scope.row)">离职</el-button>
        </div>
        <div v-else>
         <el-button class="remove_btn" size="mini" icon="el-icon-edit" type="warning" @click="editEmployee(scope.row)">修改</el-button>
         <el-button class="remove_btn" size="mini" icon="el-icon-delete" type="danger" @click="changeStatus(scope.row)">离职</el-button>
        </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="employeeSizeChange"
      @current-change="employeeCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[2,5,7,10]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 新增员工对话框 -->
    <el-dialog
      title="新增员工"
      :visible.sync="addEmpDialogVisible"
      width="50%"
      @close="closeEmp">
      <!-- 表单 -->
      <el-form :model="addEmployeeList" :rules="addEmployeeRules" ref="addEmployeeRef" label-width="120px" class="demo-ruleForm">
         <el-form-item label="员工所属部门" prop="bName" >
           <!-- @change="getTheId(addEmployeeList.bName)" -->
            <el-select v-model="addEmployeeList.bName" placeholder="请选择部门" >
              <div v-for='item in branchList' :key='item.bId'>
               <el-option :label="item.bName" :value="item.bName" ></el-option>
              </div>
            </el-select>
            <!-- <el-cascader
              v-model="bumen"
              :options="positionList[i]"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader> -->
          </el-form-item>
        <el-form-item label="员工职位" prop="bzName">
          <el-select v-model="addEmployeeList.bzName" placeholder="请选择员工职位">
            <el-option label="部门经理" value="部门经理" ></el-option>
            <el-option label="员工" value="员工" ></el-option>
            <el-option label="实习生" value="实习生" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工身份证" prop="card">
          <el-input v-model="addEmployeeList.card"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="yName">
          <el-input v-model="addEmployeeList.yName"></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="yNum">
          <el-input v-model="addEmployeeList.yNum"></el-input>
        </el-form-item>
        <el-form-item label="员工月薪" prop="yPrice">
          <el-input v-model="addEmployeeList.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="员工性别" prop="ySex">
          <el-select v-model="addEmployeeList.ySex" placeholder="请选择员工性别">
          <el-option label="女" value="2"></el-option>
          <el-option label="男" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="yState">
          <el-select v-model="addEmployeeList.yState" placeholder="请选择员工状态">
          <el-option label="正式员工" value="1"></el-option>
          <el-option label="实习" value="2"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addEmpDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEmployeeBtn">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改员工信息对话框 -->
    <el-dialog
      title="修改员工信息"
      :visible.sync="editDialogVisible"
      width="30%"
      @close="closeEditBox">
      <!-- 表单 -->
      <el-form :model="editList" :rules="editRules" ref="editRef" label-width="120px" class="demo-ruleForm">
       <el-form-item label="员工所属部门" prop="bName" >
            <el-select v-model="editList.bName" placeholder="请选择部门" >
              <div v-for='item in branchList' :key='item.bId'>
               <el-option :label="item.bName" :value="item.bName" ></el-option>
              </div>
            </el-select>
          </el-form-item>
        <el-form-item label="员工职位" prop="bzName">
          <el-select v-model="editList.bzName" placeholder="请选择员工职位">
            <el-option label="部门经理" value="部门经理" ></el-option>
            <el-option label="员工" value="员工" ></el-option>
            <el-option label="实习生" value="实习生" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="员工身份证" prop="card">
          <el-input v-model="editList.card" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" prop="yName">
          <el-input v-model="editList.yName" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工工号" prop="yNum">
          <el-input v-model="editList.yNum" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工月薪" prop="yPrice">
          <el-input v-model="editList.yPrice"></el-input>
        </el-form-item>
        <el-form-item label="员工性别" prop="ySex" >
          <el-select v-model="editList.ySex" disabled placeholder="请选择员工性别">
          <!-- <template slot-scope="scope">
            <div v-if="scope.ySex==='2'">女</div>
           <div v-if="scope.ySex=== '1'">男</div>
          </template> -->
          <el-option label="女" value="2"></el-option>
          <el-option label="男" value="1"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="yState">
          <el-select v-model="editList.yState" placeholder="请选择员工状态">
          <el-option label="正式员工" value="1"></el-option>
          <el-option label="实习" value="2"></el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBtn">确 定</el-button>
      </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
     // 自定义检验身份证号规则
      var checkCard = (rule, value, res)=>{
      var regNum = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (regNum.test(value)) {
        return res()
      }
      return res(new Error('请输入合法的身份证号'))
    }
    return {
      // 员工信息
      clerkList: [],
      // 分页数据
      queryInfo: {
        current: 1,
        size: 5
      },
      total: 0,
      // 员工状态
      statusEmp: {
         0: '离职',
        1: '正式员工',
        2: '实习'
      },
      // 新增用户对话框的显示和隐藏
      addEmpDialogVisible: false,
      // 新增员工信息
      addEmployeeList: {
        // bId: null,
        bName: '',
        bzName: '',
        card: '',
        yName: '',
        yNum: '',
        yPrice: null,
        ySex: null,
        yState: null
      },
      // 部门列表
      branchList: [],
      // 职位列表
      // positionList: [],
      // 新增员工表单的规则
      addEmployeeRules: {
        yName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        yNum: [
          { required: true, message: '请输入员工工号', trigger: 'blur' }
        ],
        card: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
           { validator: checkCard, trigger: 'blur' }
          ],
          bName: [
           { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        bzName: [
           { required: true, message: '请选择职位', trigger: 'blur' }
        ],
        yPrice: [
          { required: true, message: '请填写月薪', trigger: 'blur' }
        ],
        yState: [
          { required: true, message: '请选择员工状态', trigger: 'blur' }
        ],
        ySex: [
          { required: true, message: '请选择员工性别', trigger: 'blur' }
        ]
      },
      // 修改行信息
      editList: [],
      // 修改员工信息对话框显示和隐藏
      editDialogVisible: false,
      // 修改规则
      editRules: {
        bName: [
           { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        bzName: [
           { required: true, message: '请选择职位', trigger: 'blur' }
        ],
        yPrice: [
          { required: true, message: '请填写月薪', trigger: 'blur' }
        ],
        yState: [
          { required: true, message: '请选择员工状态', trigger: 'blur' }
        ]
      },
      // 离职数据
      removeList: []
    }
  },
  created () {
    this.getClerk()
    this.getBranch()
    // this.getPosition()
  },
  methods: {
    // 获取员工信息
    async getClerk() {
      const { data: res } = await this.$http.get('employee/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
        return this.$message.error('获取员工信息失败')
      }
      this.$message.success('获取员工信息成功')
      this.clerkList = res.data.records
      this.total = res.data.total
    },
    // 监听分页size的变化
    employeeSizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getClerk()
    },
    // 监听分页current的变化
    employeeCurrentChange(newpage) {
      this.queryInfo.current = newpage
      this.getClerk()
    },
    // 点击新增员工按钮点击
    addEmployee() {
      this.addEmpDialogVisible = true
    },
    // 关闭新增对话框
    closeEmp() {
      this.addEmployeeList = {}
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
    // 确定新增员工按钮
    addEmployeeBtn() {
      // 先验证输入是否有效
      this.$refs.addEmployeeRef.validate(async valid=>{
        if (!valid) {
          return 
        }
        const { data: res } = await this.$http.post('employee/add', this.addEmployeeList)
        console.log(res)
        if (res.code !== '200') {
          return this.$message.error('新增员工失败')
        }
        this.$message.success('新增员工成功')
        this.getClerk()
      })
      this.addEmpDialogVisible = false
    },
    // 修改按钮点击
    editEmployee(row) {
      // console.log(row)     
      this.editList = row
      this.editDialogVisible = true
    },
    // 修改员工信息对话框关闭
    closeEditBox() {
      this.editList = []
    },
    // 确定修改按钮
    editBtn() {
      // 先验证输入是否有效
        this.$refs.editRef.validate(async valid=>{
        if (!valid) {
          return 
        }
        const { data: res } = await this.$http.post('employee/update', this.editList)
        // console.log(res)
        if (res.code !== '200') {
          return this.$message.error('修改员工信息失败')
        }
        this.$message.success('修改员工信息成功')
        this.getClerk()
      })
       this.editDialogVisible = false
    },
    // 点击离职按钮
    async changeStatus(row) {
      this.removeList = row
      this.removeList.yState = 0
      const result = await this.$confirm('确定此员工离职？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        //  进行错误拦截 把错误返回
        return err
      })
      if (result !== 'confirm') {
        return this.$message.info('您已经取消了离职')
      }
      // 发送请求
      const { data: res } = this.$http.post('employee/delete', this.removeList)
      // console.log(res)
       this.$message.success('离职成功')
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
