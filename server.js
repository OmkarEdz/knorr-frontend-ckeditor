
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const serverStatic=require('serve-static')
var proxy = require('express-http-proxy');
var http = require('http')
path=require('path')
const app = express();
//let apiProxy = createProxyMiddleware({ target: 'http://localhost:8090' ,secure:false,changeOrigin:false, ws: true});
 const apiProxy = createProxyMiddleware({ target: 'https://knorr-bremse-trainingbackend-production.up.railway.app' ,secure:false,changeOrigin:true, ws: true,onProxyRes: (proxyRes, req, res) => {
  proxyRes.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate';
}, headers: {
"Connection": "keep-alive"
}, proxyTimeout: 17000,
 logLevel: "debug"});
app.use('/api', apiProxy)
app.use('/logout', apiProxy)
app.use('/files', apiProxy)
app.use('*/css',express.static(path.join(__dirname , "/target/dist/",'/static/css') ,{
    etag: true,
    maxAge: '1d'
}));
app.use('*/js',express.static(path.join(__dirname , "/target/dist/",'/static/js'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/img',express.static(path.join(__dirname , "/target/dist/",'/static/img'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/jpg',express.static(path.join(__dirname , "/target/dist/",'/static/img'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/png',express.static(path.join(__dirname , "/target/dist/",'/static/img'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/svg',express.static(path.join(__dirname , "/target/dist/",'/static/img'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/fonts',express.static(path.join(__dirname , "/target/dist/",'/static/fonts'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/css.map',express.static(path.join(__dirname , "/target/dist/",'/static/css.map'),{
  etag: true,
  maxAge: '1d'
}));
app.use('*/webfonts',express.static(path.join(__dirname , "/target/dist/",'/static/webfonts'),{
  etag: true,
  maxAge: '1d'
}));
app.use('/*?', apiProxy)
const staticFileMiddleware = express.static(path.join(__dirname , '/target/dist'));
app.use(staticFileMiddleware);
app.use(history({
  verbose: true
}));
app.use(staticFileMiddleware);
const port=process.env.PORT || 8080
app.listen(port)
console.log(path.join(__dirname , '/target/dist/','index.html'));
console.log(`app is listening on port: ${port}`)