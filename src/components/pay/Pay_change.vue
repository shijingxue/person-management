<template>
  <div>
    <Mix nav1='薪资管理' nav2='员工薪资变动统计'></Mix>
    <el-card>
      123
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
        size: 5
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
      console.log(res)
      if (res.code !== '200') {
          return this.$message.error('获取员工薪资变动失败')
      }
      this.$message.success('获取员工薪资变动成功')
      this.empPayChangeList = res.data.records
      this.total = res.data.total
    }
  }
}
</script>

<style lang="less" scoped>
</style>
