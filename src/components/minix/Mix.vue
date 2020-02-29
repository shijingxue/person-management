<template>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/hello' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{nav1}}</el-breadcrumb-item>
      <el-breadcrumb-item class="menu_one">{{nav2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
  props: ['nav1', 'nav2']
}
</script>
<style lang="less" scoped>
.menu_one {
  font-weight: 700 !important;
}
.el-breadcrumb {
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
