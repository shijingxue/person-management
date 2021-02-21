<template>
  <div class='new-user'>
    <Mix nav1='用户管理' nav2='新增用户'></Mix>
    <el-card>
      <user-set :utype ='Number(this.$store.state.type)'></user-set>
    </el-card>
  </div>
</template>

<script>
import UserSet from '../../components/UserSet.vue'
export default {
  name: 'NewUser',
  components: {
    UserSet
  },
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
