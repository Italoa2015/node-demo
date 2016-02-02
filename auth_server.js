'use strict';
/***********
 * 实现应用程序的数据库连接和Express Web服务器
 * 主应用程序文件
 * ken
 ***********/

// express服务器,是对nodejs的http模块的封装
var express = require('express');
// express的中间件
// 把POST请求正文中的json数据解析为req.body
var bodyParser = require('body-parser');
// express中间件
// 可以从请求中读取cookie,并在响应中设置cookie
var cookieParser = require('cookie-parser');
// express中间件
// 提供了一个强大的会话实现
var expressSession = require('express-session');
// 提供express和mongoDB之间联系，使mongodb作为会话的持久层存储 
var mongoStore = require('connect-mongo')(expressSession);
// 文档对象模型库，对mongo nodejs原生驱动程序进行了封装
var mongoose = require('mongoose');
// 引入mongoose的User模型
// 确保User Schema在mongoose中注册
require('./models/users_model.js');
// 连接mongo数据库
var conn = mongoose.connect('mongodb://localhost/MyApp');
//onsole.log(conn);
// 配置express服务器
var app = express();

// 配置模板引擎
// 添加.html为文件扩展名
app.engine('.html', require('ejs').__express);
// 设置模板文件的根目录
app.set('views', __dirname + '/views');
// 添加视图引擎
app.set('view engine', 'html');

// 在全局范围内把bodyPserser中间件分配给所有路径
app.use(bodyParser());
// 在全局范围内cookieParser中间件分配给所有路径
app.use(cookieParser());

// 使用connect-mongo库把MongoDB连接作为已通过身份验证
// 的会话的持久性存储来注册
// mongoStore实例的db被设定为已经连接的mongoose.connection.db数据库
// connect-mongo存储传递一个对象和设定到express-session模块的实例session
app.use(expressSession({
    secret: 'SECRET',
    key: 'key', 
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }, //1 days
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        host: 'localhost',
        port: '27071',
        url: 'mongodb://localhost/blog',
        db: 'MyApp'
    })
}));


// 添加从./routes到Express服务器的路由
require('./routes')(app);


// 监听80端口
app.listen(80);
