const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
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

app.listen(process.env.PORT || 3000, function() {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env,
  );
});
