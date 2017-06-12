1.demo包含用户注册、登录验证、信息修改、删除用户等。

2.前台方面,样式使用纯html+css,数据使用angularJs来向后台发送请求获取用户信息,并双向绑定数据,校验输入的值。通过表单、超链接向后台发起POST/GET请求。

3.后台方面,使用node的express模块配置http服务器,配置web请求路由,配置视图模板引擎。
使用express中间件如body-parser、cookie-parser、express-session、connect-mongo、static等。

4.数据库方面，使用mongoose模块来连接Mongo数据库，定义collection的Schema对其进行结构化。并利用express-session和connect-mongo将数据库连接保存在会话中，实现持久化。

5.静态文件方面，express服务器通过内置的static中间件以流式处理对静态文件的GET请求。

6.模块方面，遵守COMMONJS规范对外发布模块。

7.其他方面，使用body-parser中间件在全局处理POST请求，把请求正文中的JSON数据解析为req.body属性。使用crypto模块对密码进行加密。

这个项目会持续的更新...












