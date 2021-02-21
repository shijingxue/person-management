// 主机地址(根据应用的运行环境变化)
const HOST = process.env.NODE_ENV === 'development'
  ? 'http://127.0.0.1:8085'               // 开发环境主机地址
  // : 'http://blue.duorenwei.cn';     // 生产环境主机地址
  // : 'http://172.16.5.76:8080';
  : 'http://127.0.0.1:8085'

export default HOST;
// http://172.16.5.76:8080
