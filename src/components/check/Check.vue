<template>
  <div>
    <Mix nav1='考勤管理' nav2='考勤信息管理'></Mix>
    <el-card>
      <el-table :data="empCheckList" style="width: 100%" border stripe>
      <el-table-column  prop="id"  label="考勤记录id"  width="180"></el-table-column>
      <el-table-column  prop="yBranch"  label="员工部门"  width="180"></el-table-column>
      <el-table-column  prop="yPosition"  label="员工职位"></el-table-column>
      <el-table-column  prop="yNum"  label="员工编号"></el-table-column>
      <el-table-column  prop="yName"  label="员工姓名"></el-table-column>
      <el-table-column  prop="punchTime"  label="打卡时间"></el-table-column>
      <el-table-column  prop="beLate"  label="是否迟到">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.beLate===0">没迟到</el-tag>
          <el-tag type="danger" v-else>迟到</el-tag>
        </template>
      </el-table-column>
      <el-table-column  prop="because"  label="原因"></el-table-column>
    </el-table>

    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[5,8,10]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
   return {
      empCheckList: [],
      queryInfo: {
        current: 1,
        size: 5
      },
      total: 0
    }
  },
  created () {
    this.getEmpCheckList()
  },
  methods: {
  async getEmpCheckList() {
      const { data: res } = await this.$http.get('timeTag/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取员工薪资变动失败')
      }
      this.$message.success('获取员工薪资变动成功')
      this.empCheckList = res.data.records
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getEmpCheckList()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.current = newpage
      this.getEmpCheckList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
