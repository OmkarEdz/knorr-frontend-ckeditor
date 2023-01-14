
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const serverStatic=require('serve-static')
var proxy = require('express-http-proxy');
var http = require('http')
path=require('path')
const app = express();
app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})
app.enable('strict routing');
//let apiProxy = createProxyMiddleware({ target: 'http://localhost:8090' ,secure:false,changeOrigin:false, ws: true});
const apiProxy = createProxyMiddleware({ target: 'https://knorr-bremse-trainingbackend-production.up.railway.app' ,secure:false,changeOrigin:true, ws: true, headers: {
  "Connection": "keep-alive"
}, proxyTimeout: 17000,
logLevel: "debug"});
app.use('/api', apiProxy)
app.use('/logout', apiProxy)
app.use('/files', apiProxy)
app.use('*/css',express.static(path.join(__dirname , "/public/",'/static/css')));
app.use('*/js',express.static(path.join(__dirname , "/public/",'/static/js')));
app.use('*/img',express.static(path.join(__dirname , "/public/",'/static/img')));
app.use('*/fonts',express.static(path.join(__dirname , "/public/",'/static/fonts')));
app.use('*/css.map',express.static(path.join(__dirname , "/public/",'/static/css.map')));
app.use('*/webfonts',express.static(path.join(__dirname , "/public/",'/static/webfonts')));
//app.use('/*?lang', apiProxy)
const staticFileMiddleware = express.static(path.join(__dirname , '/target/dist'));
app.use(staticFileMiddleware);
app.use(history({
  verbose: true
}));
app.use(staticFileMiddleware);
const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)