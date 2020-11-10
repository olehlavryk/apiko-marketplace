const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.listen(process.env.PORT || 3000);
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apiko-intensive-backend.herokuapp.com/',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin: true,
    }),
  );
};
