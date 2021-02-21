<template>
  <div style="height:100%;">
    <el-container class="home-container">
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt />
          餐厅点餐系统
        </div>
        <!-- 退出按钮 -->
        <el-button type="primary" @click="layout">退出</el-button>
      </el-header>
      <el-container class="con_box">
        <el-aside :width="isCollapse?'64px':'200px'">
          <!--  伸缩侧边栏按钮 -->
          <div class="toggle-button" @click="toggleBtn">| | |</div>
          <el-menu
            background-color="#0066CC"
            text-color="#fff"
            :unique-opened="true"
            active-text-color="#409EFF"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="navActive"
            :router="true"
          >
            <!-- 一级菜单 -->
            <!-- 这里的index只接收字符串  但是id是数字，要转换成字符串 -->
            <el-submenu :index="item.id+''" v-for="item in asideList" :key="item.id">
            <!-- <el-submenu index="1"> -->
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- <i class="el-icon-help"></i> -->
                <i class="icon_list" :class="iconList[item.id]"></i>
                <span>{{item.authname}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="item2.path" @click="toPath(item2.path)" v-for="item2 in item.list" :key="item2.id">
                <!-- 二级菜单模板区域 -->
                <template slot="title" >
                  <i class="el-icon-menu"></i>
                  <span>{{item2.authname}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 侧边栏数据
      asideList: [
        {
          'id': 1,
          'pid': 0,
          'authname': '菜品管理',
          'path': null,
          'list': [
            {
              'id': 7,
              'pid': 1,
              'authname': '菜品列表',
              'path': '/foodlist',
              'list': null
            }
          ]
        },
        {
          'id': 2,
          'pid': 0,
          'authname': '营业额',
          'path': null,
          'list': [
            {
              'id': 8,
              'pid': 2,
              'authname': '营业数据统计',
              'path': '/branchmessage',
              'list': null
            }
          ]
        },
        {
          'id': 3,
          'pid': 0,
          'authname': '用户管理',
          'path': null,
          'list': [
            {
              'id': 9,
              'pid': 3,
              'authname': '新增用户',
              'path': '/newuser',
              'list': null
            },
            {
              'id': 10,
              'pid': 3,
              'authname': '修改密码',
              'path': '/changepwd',
              'list': null
            }

          ]
        }        

      ],
      isCollapse: false,
      iconList: {
        '1': 'iconfont icon-bumen',
        '2': 'iconfont icon-w_zhiyuan',
        '3': 'iconfont icon-jiangchengguanli',
        '4': 'iconfont icon-yonghu',
        '5': 'iconfont icon-xinzi',
        '6': 'iconfont icon-kaoqin'
      },
      //  链接的激活状态
      navActive: '',
      // 用户类型
      type: this.$store.state.type
    }
  },
  created() {
    // this.getAside()
    //  获取链接的激活状态
    this.navActive = window.sessionStorage.getItem('navActive')
  },
  methods: {
    // 退出按钮
    layout() {
      window.sessionStorage.clear('token')
      this.$router.push('/login')
      this.$store.commit('setType', null)
    },
    //  获取侧边栏数据
    // async getAside() {
    //   const { data: res } = await this.$http.get('menus')
    //   // console.log('侧边栏数据', res)
    //   if (res.code !== '200') {
    //     return this.$message.error(res.meta.msg)
    //   }
    //   this.asideList = res.data
    // },
    // 伸缩侧边栏
    toggleBtn() {
      this.isCollapse = !this.isCollapse
    },
    //  跳转页面  保存链接的激活状态
    toPath(navActive) {
      window.sessionStorage.setItem('navActive', navActive)
      this.navActive = navActive
      // console.log(navActive)
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #214e9c;
  height: 80px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 22px;
  div {
    display: flex;
    align-items: center;
  }
}
.logo img {
  width: 185px;
  height: 100px;
}
.el-aside {
  background-color: #2d61bb;
  box-sizing: border-box;
}
.el-main {
  background-color: #eaedf1;
}
.el-menu {
  border-right: none;
}
.toggle-button {
  text-align: center;
  background-color: #2d61bb;
  padding: 8px;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
}
.el-submenu [class^='el-icon-'] {
  margin-right: 15px;
}
.iconfont {
  margin-right: 15px;
  font-size: 20px;
}
</style>
