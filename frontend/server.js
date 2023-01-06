
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const serverStatic=require('serve-static')
path=require('path')
const bodyParser = require("body-parser");
const app = express();
var router = express.Router();
var request = require('request');
const staticFileMiddleware = express.static(path.join(__dirname , '/dist'));
app.use(staticFileMiddleware);
app.use(history({
  verbose: true
}));
app.use(staticFileMiddleware);
app.use('*/css',express.static(path.join(__dirname , "/public/",'/static/css')));
app.use('*/js',express.static(path.join(__dirname , "/public/",'/static/js')));
app.use('*/img',express.static(path.join(__dirname , "/public/",'/static/img')));
app.use('*/fonts',express.static(path.join(__dirname , "/public/",'/static/fonts')));
app.use('*/css.map',express.static(path.join(__dirname , "/public/",'/static/css.map')));
app.use('*/webfonts',express.static(path.join(__dirname , "/public/",'/static/webfonts')));
app.use('*/files/flags',express.static(path.join(__dirname , "/public/",'/files/flags')));
app.use('*/files/images',express.static(path.join(__dirname , "/public/",'/files/images')));

// Add middleware for http proxying 
const apiProxy = createProxyMiddleware('/api', { target: 'http://localhost:8090' });
app.use('/api', apiProxy)


app.use(bodyParser.json());
const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)