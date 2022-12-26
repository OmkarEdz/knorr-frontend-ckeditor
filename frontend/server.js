
const express = require('express')
const history = require('connect-history-api-fallback');
const serverStatic=require('serve-static')
path=require('path')
const bodyParser = require("body-parser");
path = __dirname + "\\public\\";
const app = express();
const staticFileMiddleware = express.static(__dirname + '\\dist');
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);
app.get('/', function (req, res) {
    res.render(__dirname + '\\dist\\index.html');
  });
app.use('*/css',express.static(path+'\\static'+'\\css'));
app.use('*/js',express.static(path+'\\static'+'\\js'));
app.use('*/img',express.static(path+'\\static'+'\\img'));
app.use('*/fonts',express.static(path+'\\static'+'\\fonts'));
app.use('*/css.map',express.static(path+'\\static'+'\\css.map'));
app.use('*/webfonts',express.static(path+'\\static'+'\\webfonts'));
app.use(bodyParser.json());
const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)