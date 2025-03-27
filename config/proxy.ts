export default {
  '/szjs-api/gateway': {
    // target: 'https://jsszkj.kxjst.jiangsu.gov.cn/',
    target: 'http://10.0.77.34:6325/',
    // target: 'http://192.168.3.22:81/', // 佑成1
    // target: 'http://192.168.7.50:8080/',  // 佑成2
    changeOrigin: true,
    pathRewrite: {
      '^/szjs-api/gateway': '/gateway',
    },
  },
  // 流程平台,如果不需要流程平台，请删除该配置
  '/api-flow': {
    target: 'http://10.0.77.34:15415/',
    changeOrigin: true,
  },
};
