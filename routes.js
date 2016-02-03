'use strict';
// 为Express服务器实现处理Web请求的路由

// 加密模块
var crypto = require('crypto');
// express模块
var express = require('express');

// 对外输出模块变量
// 方法接收一个express对象
module.exports = function(app) {
    //  获取到与数据库交互的模块对象
    var users = require('./controllers/users_controllers');
    app.use('/static', express.static('./static')).use('/lib', express.static('../'));

    // 不带路径，访问系统
    app.get('/', function(req, res) {
        if (req.session.user) {
            res.render('index', {
                username: req.session.username,
                msg: req.session.msg
            });
        } else {
            //req.session.msg = 'Access denied!';
            res.redirect('/login');
        }
    });

    // 访问用户
    app.get('/user', function(req, res) {
        if (req.session.user) {
            res.render('user', {
                msg: req.session.msg
            });
        } else {
            req.session.msg = 'Access denied!'
            res.redirect('/login');
        }
    });

    // 提交注册请求
    app.get('/signup', function(req, res) {
        if (req.session.user) {
            res.redirect('/');
        }
        res.render('signup', {
            msg: req.session.msg
        });
    });

    // 提交登录请求
    app.get('/login', function(req, res) {
        if (req.session.user) {
            res.redirect('/');
        }
        res.render('login', {
            msg: req.session.msg
        });
    });

    // 提交登出请求
    app.get('/logout', function(req, res) {
        req.session.destroy(function() {
            res.redirect('/login');
        });
    });

    // 注册
    app.post('/signup', users.signup);
    // 更新用户
    app.post('/user/update', users.updateUser);
    // 删除用户
    app.post('/user/delete', users.deleteUser);
    // 登录
    app.post('/login', users.login);
    // 用户信息
    app.get('/user/profile', users.getUserProfile);

};
