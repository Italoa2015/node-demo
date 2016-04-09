'use strict';
// 定义User的schema模型


// 引入mongoose模块，定义Schema对象
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// 定义用户模型
var UserSchema = new Schema({
    username:{type:String,unique:true},
    email:String,
    color:String,
    hashed_password:String
});

// 生成模型
mongoose.model('User',UserSchema);
//