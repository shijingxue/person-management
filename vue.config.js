module.exports = {
  devServer: {
    // before: require('./mock/index.js'), // 引入mock/index.js
    // 端口
    port: 3000
    // lintOnSave: false // 取消 eslint 验证
      /* 使用代理 */
      // proxy: {
      //     '/api': {
      //         /* 目标代理服务器地址 */
      //         ws: false,
      //         target: 'http://yapi.demo.qunar.com/mock/83256/api/',
      //         /* 允许跨域 */
      //         changeOrigin: true,
      //         pathRewrite: {
      //           '^/api': ''
      //         }
      //     }
      // }
  }
}
