
const express = require('express')
const serverStatic=require('serve-static')
path=require('path')
const bodyParser = require("body-parser");
path = __dirname + "\\public\\";
const app = express();
app.use('*/css',express.static(path+'\\static'+'\\css'));
app.use('*/js',express.static(path+'\\static'+'\\js'));
app.use('*/img',express.static(path+'\\static'+'\\img'));
app.use('*/fonts',express.static(path+'\\static'+'\\fonts'));
app.use('*/css.map',express.static(path+'\\static'+'\\css.map'));
app.use('*/webfonts',express.static(path+'\\static'+'\\webfonts'));
app.use(bodyParser.json());
const port=process.env.PORT || 8080
app.listen(port)
console.log(`app is liestening on port: ${port}`)