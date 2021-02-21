<template>
  <div class="public-pagination">
    <el-pagination
      background
      hide-on-single-page
      layout="total, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'PublicPagination',
    props: {
      // 总数量
      total: {
        type: Number,
        required: true
      },

      // 每页的数量
      pageSize: {
        type: Number,
        default: 10
      },

      // 当前页数
      currentPage: {
        type: Number,
        default: 1
      }
    },

    methods: {
      // currentPage 改变时会触发
      handleCurrentChange(currentPage) {
        this.$emit('current-change', currentPage)
      }
    }
  }
</script>

<style scoped>
  .public-pagination {
    text-align: center;
    margin-top: 30px;
    margin-bottom: 100px;
  }
</style>
