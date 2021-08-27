const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://39.103.146.61', //配置你要请求的服务器地址
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  );
};