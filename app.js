var express = require('express');
var path = require('path');
var router = require('./router');
var body = require('body-parser');
var session = require('express-session');

var app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// 配置中间件
app.use(body.urlencoded({ extended: false }));
// parse application/json
app.use(body.json());


// 开放资源
app.use('/public',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules',express.static(path.join(__dirname,'./node_modules/')));

// 配置 express-art-template ，第一个参数是扩展名，默认是views文件夹
app.engine('html',require('express-art-template'));

// 挂载路由
app.use(router);


app.listen(3000,function () {
    console.log('成功启动.......');
});