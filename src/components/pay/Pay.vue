<template>
  <div>
    <Mix nav1='薪资管理' nav2='员工薪资录入'></Mix>
    <el-card>
      <el-table
        :data="empPayList"
        style="width: 100%" border stripe>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form :model="props.row" label-width="150px" disabled>
                <el-form-item label="员工姓名">
                  <el-input v-model="props.row.ygName" ></el-input>
                </el-form-item>
                <el-form-item label="员工部门">
                  <el-input v-model="props.row.ygBName" ></el-input>
                </el-form-item>
                <el-form-item label="员工职位">
                  <el-input v-model="props.row.ygBzName" ></el-input>
                </el-form-item>
                <el-form-item label="员工月薪">
                  <el-input v-model="props.row.ygPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工实发工资">
                  <el-input v-model="props.row.ygAllPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工奖励金额">
                  <el-input v-model="props.row.jJPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工应扣工资">
                  <el-input v-model="props.row.jFPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工餐补">
                  <el-input v-model="props.row.ygCbPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工住房补贴">
                  <el-input v-model="props.row.ygFPrice" ></el-input>
                </el-form-item>
                <el-form-item label="员工交通补贴">
                  <el-input v-model="props.row.ygJtPrice" ></el-input>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
        <el-table-column  label="工资表id"  prop="id"></el-table-column>
        <el-table-column  label="员工姓名"  prop="ygName"></el-table-column>
        <el-table-column  label="员工部门"  prop="ygBName"></el-table-column>
        <el-table-column  label="员工职位"  prop="ygBzName"></el-table-column>
        <el-table-column  label="员工实发工资"  prop="ygAllPrice"></el-table-column>
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
      empPayList: [],
      queryInfo: {
        current: 1,
        size: 5
      },
      total: 0
    }
  },
  created () {
    this.getPayList()
  },
  methods: {
    async getPayList() {
      const { data: res } = await this.$http.get('ePrice/selectPage', { params: this.queryInfo })
      // console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取员工薪资失败')
      }
      // this.$message.success('获取员工薪资成功')
      this.empPayList = res.data.records
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.queryInfo.size = newsize
      this.getPayList()
    },
    handleCurrentChange(newpage) {
      this.queryInfo.current = newpage
      this.getPayList()
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 150px;
}
.el-form-item {
  float: left;
  width: 50%;
}

</style>
