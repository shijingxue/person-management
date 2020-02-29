<template>
  <div>
    <Mix nav1='职员管理' nav2='员工信息管理'></Mix>
    <el-card>
      123
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clerkList: []
    }
  },
  created () {
    this.getClerk()
  },
  methods: {
    // 获取员工信息
    getClerk() {
      
    }
  }
}
</script>

<style lang="less" scoped>
</style>
