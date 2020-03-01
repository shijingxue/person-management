<template>
  <div>
    <!-- 面包屑导航 -->
    <Mix nav1='奖惩管理' nav2='奖惩信息管理'></Mix>
    <el-card>
      <!-- 新增奖惩信息 -->
       <el-button class="addEmployee" icon="el-icon-plus" type="primary" @click="addReward">新增奖惩信息</el-button>
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
.addEmployee {
  margin-bottom: 20px;
}
</style>
