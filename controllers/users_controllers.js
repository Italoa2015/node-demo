'use strict';
// 完整实现与User模型交互的路由


// 加密解密模块
var crypto = require('crypto');
// 结构化mongo模块
var mongoose = require('mongoose');
// 获取User数据模型
var User = mongoose.model('User');


// 对密码进行加密
function hashPW(pwd) {
    return crypto.createHash('sha256').update(pwd).
    digest('base64').toString();
}

// 注册
exports.signup = function(req, res) {
    var user = new User({
        username: req.body.username
    });
    user.set('hashed_password', hashPW(req.body.password));
    user.set('email', req.body.email);
    user.set('color',req.body.color);
    user.save(function(err) {
        if (err) {
            res.sessor.error = err;
            res.redirect('/signup');
        } else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = 'Authenticated as ' + user.username;
            res.redirect('/');
        }
    });
};

// 登录
exports.login = function(req, res) {
    User.findOne({
        username:req.body.username
    }).exec(function(err, user) {
        if (!user) {
          err = 'User Not Found.';
        } else if (user.hashed_password === hashPW(req.body.password.toString())) {
            req.session.regenerate(function() {
                req.session.user = user.id;
                req.session.username = user.username;
                req.session.msg = 'Authenticated as ' + user.username;
                res.redirect('/');
            });
        } else {
            err = 'Authentication failed.';
        }
        if (err) {
            req.session.regenerate(function() {
                req.session.msg = err;
                res.redirect('/login');
            });
        }
    });
};

//获取用户信息
exports.getUserProfile = function(req, res) {
    User.findOne({
            _id: req.session.user
        })
        .exec(function(err, user) {
            if (!user) {
                res.json(404, {
                    err: 'User not found.'
                });
            } else {
                res.json(user);
            }
        });
};

// 更新用户信息
exports.updateUser = function(req, res) {
    User.findOne({
            _id: req.session.user
        })
        .exec(function(err, user) {
            user.set('color', req.body.color);
            user.save(function(err) {
                if (err) {
                    res.sessor.error = err;
                } else {
                    req.session.msg = 'User Updated.';
                }
                res.redirect('/user');
            });
            console.log(user);
        });
                    //console.log(req.body);
            //console.log(req.session);
};

// 删除用户
exports.deleteUser = function(req, res) {
    User.findOne({
            _id: req.session.user
        })
        .exec(function(err, user) {
            if (user) {
                user.remove(function(err) {
                    if (err) {
                        req.session.msg = err;
                    }
                    req.session.destroy(function() {
                        res.redirect('/login');
                    });
                });
            } else {
                req.session.msg = "User Not Found!";
                req.session.destroy(function() {
                    res.redirect('/login');
                });
            }
        });
};
