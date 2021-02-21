<template>
  <div class="box">
    <el-card class="title_box">
      今天的天气怎么样？
    </el-card>
    <el-card>
      <div class="block">
         <span class="demonstration">公告栏</span>
        <el-carousel height="600px" width="400px">
          <el-carousel-item v-for="item in theWord" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theWord: {
        0: '今天发工资~',
        1: '下午3点开会~',
        2: '今天来了新同事哦~',
        3: '今天提前下班哦~'
      }
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.box {
  text-align: center;
  font-size: 28px;
  .el-card {

    color: #000;
  }
}
.title_box {
  text-align: left;
}
.el-carousel__item{
  margin-top: 20px;
}
 .el-carousel__item h3 {
    color: #000;
    font-size: 30px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #CCFFFF;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #FFCCCC;
  }
</style>
