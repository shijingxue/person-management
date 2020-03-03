<template>
  <div>
    <Mix nav1='薪资管理' nav2='员工薪资变动统计'></Mix>
    <el-card>
      <el-table :data="empPayChangeList" style="width: 100%" border stripe>
        <el-table-column  prop="id"  label="员工记录表id"  width="180"></el-table-column>
        <el-table-column  prop="yNum"  label="员工工号"  width="180"></el-table-column>
        <el-table-column  prop="eId"  label="员工id"></el-table-column>
        <el-table-column  prop="yName"  label="员工名称"></el-table-column>
        <el-table-column  prop="ySex"  label="员工性别 ">
          <template slot-scope="scope">
            <div v-if='scope.row.ySex===1'>男</div>
            <div v-else>女</div>
          </template>
        </el-table-column>
        <el-table-column  prop="bBeforeName"  label="原来员工所属部门名称"></el-table-column>
        <el-table-column  prop="bzBeforeName"  label="原来员工所属职位名称"></el-table-column>
        <el-table-column  prop="bName"  label="现在员工所属部门名称"></el-table-column>
        <el-table-column  prop="bzName"  label="现在员工所属职位名称"></el-table-column>
        <el-table-column  label="员工状态"  prop="yState">
          <template slot-scope="scope">
          <div v-if='scope.row.yState===1'>正式员工</div>
          <div v-else-if='scope.row.yState===2'>实习</div>
          <div v-else-if='scope.row.yState===0'>离职</div>
          </template>
        </el-table-column >
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.current"
        :page-sizes="[5,8,10,15]"
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
      empPayChangeList: [],
      queryInfo: {
        current: 1,
        size: 8
      },
      total: 0
    }
  },
  created () {
    this.getPayChangeList()
  },
  methods: {
  async getPayChangeList() {
      const { data: res } = await this.$http.get('echange/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取员工薪资变动失败')
      }
      // this.$message.success('获取员工薪资变动成功')
      this.empPayChangeList = res.data.records
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getPayChangeList()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.current = newpage
      this.getPayChangeList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
