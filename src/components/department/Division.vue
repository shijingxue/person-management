<template>
  <div>
    <!-- 面包屑导航 -->
    <Mix nav1="部门管理" nav2="部门信息管理" ></Mix>
    <!-- 卡片 -->
    <el-card class="box-card">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column prop="date" label="部门编号" width="180"></el-table-column>
          <el-table-column prop="name" label="部门名称" width="180"></el-table-column>
          <el-table-column prop="address" label="部门经理"></el-table-column>
          <el-table-column prop="address" label="部门人数"></el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>

</style>
