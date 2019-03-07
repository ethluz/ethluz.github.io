---
templateKey: blog-post
title: 把koa2扩展成一个完备服务端api开发框架
date: 2017-12-17T15:04:10.000Z
description: 将koa2做成一个易用开发的api框架:快速的数据库model层,对用户请求类型参数的完整的处理,系统日志,异常错误的处理.一定程度的分层是必须的
tags:
  - nodejs
  - 后端
---

如题,koa本身只包含基础的接受请求返还请求.所有的其他功能都通过洋葱中间件模型实现.
我刚好实现了一个扩展koa2本身功能,满足服务端快速开发的框架.在我看来完备的服务端开发框架,需要满足:快速的数据库改建,对用户请求类型参数的完整的处理,系统日志,异常错误的处理.一定程度的分层是必须的,规划统一的开发方式也是必须的.


## 0.前置知识点
koa的基础知识,例如:ctx作用.
Es6语法:知道回调函数,知道primise的用法,例如then.最新的同步异步处理,如
Nvm安装配置,npm的常用命令. 


## 1.初始化koa2
前置条件:安装nvm(nodejs多版本神器),然后切换版本,到8.11以上版本.
*创建新目录,然后npm包创建项目:(你也可以使用yarn)*
```
npm init
```
项目初始化完成后,会生成package.json.于是你应该就是明白,这个json目录咋回事了..然后以后每次使用npm install xx -save(使用npm安装xx模块,并保存到当前目录).

Package.json文件就会有更改.当然当前目录下还会有node\_module专门存储项目所安装的模块.
*我们可以安装 Koa（观察 package.json中的变化）*
```
npm install koa -save
```

*当前项目目录下,创建app.js文件,写代码:*
```
const Koa = require('koa')
const app = new Koa() 
app.use(async (ctx, next) => { 
	await next() 
	ctx.response.type = 'text/html' ctx.response.body = '<h1>Hello koa!</h1>'

}) app.listen(3000, () => { console.log('server is running at http://localhost:3000')
})
```
运行node app.js，浏览器中打开`http://localhost:3000' `显示: `Hello koa!` 。

## 2.实现路由&controller&简单的代码分层
 安装router,并划分目录结构,可参考我的提交:
[https://github.com/ethluz/koa2-apiserver-mvp/commit/c855b769a801e3825943fa83f9dc65f949e70171](https://github.com/ethluz/koa2-apiserver-mvp/commit/c855b769a801e3825943fa83f9dc65f949e70171)
代码目录结构如下:
![](DraggedImage.png)
具体步骤(代码就不粘贴了,github上有提交)
需要安装:koa-router模块,然后创建:router.js
[https://github.com/ethluz/koa2-apiserver-mvp/blob/c855b769a801e3825943fa83f9dc65f949e70171/router.js](https://github.com/ethluz/koa2-apiserver-mvp/blob/c855b769a801e3825943fa83f9dc65f949e70171/router.js)
routerjs中引入了controller,于是就涉及到创建controller目录,添加home.js:
[https://github.com/ethluz/koa2-apiserver-mvp/tree/c855b769a801e3825943fa83f9dc65f949e70171/controller](https://github.com/ethluz/koa2-apiserver-mvp/tree/c855b769a801e3825943fa83f9dc65f949e70171/controller)
最后还要在app.js中载入router中间件.


## 3.借助babel&实现es6 style的koa
```
npm i babel-core  babel-polyfill babel-preset-env babel-preset-es2015  babel-preset-stage-0  -S 
```
在app.js最上方添加如下代码.
```
require("babel-core/register")({  
    presets: ['env', 'stage-0']
});
require("babel-polyfill"); 
```
Ps:如果你直接用node.js10以上版本,将自带es6的支持,可跳过上面的配置(主要还是import from, async,await,let,const nodejs8也能支持).

完整的代码可查看,如下提交:
[https://github.com/ethluz/koa2-apiserver-mvp/commit/d3c1cad77761717809c29a5163abfd8d8bd41c63](https://github.com/ethluz/koa2-apiserver-mvp/commit/d3c1cad77761717809c29a5163abfd8d8bd41c63)
这样就可以放心的使用es6语法糖了.
 
## 4.实现中间件
其实在上面的router使用中,我们就可以把koa-ruoter当作中间件,实际上所有的app.use 都是载入中间件的方式:
```
// 示例:载入 bodyparser中间件
  	app.use(bodyParser())
```
但我们需要考虑代码分层,提升整个koa服务端的拓展性,代码可读性.

*中间件扩展*
设计的思路:
1.我们不能把所有的app.use都写在app.js中,需要分层. 2.app.use(function())  需要摒弃.同样的把每个拓展都单独写在各自文件里,于是:
首先创建了middleware目录,然后创建一个中间件mi-send(用于解析json,返回给客户端).
mi-send目录中创建index.js:
```js
module.exports = () => {
  function render(json) {
      this.set("Content-Type", "application/json")
      this.body = JSON.stringify(json)
  }
  return async (ctx, next) => {
      ctx.send = render.bind(ctx)
      await next()
  }
}
```

然后在middleware目录下创建一个,index.js用于集中载入中间件:
```js
const path = require('path')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const staticFiles = require('koa-static')

const miSend = require('./mi-send')
module.exports = (app) => {
  app.use(staticFiles(path.resolve(__dirname, "../public")))

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));

  app.use(bodyParser())
  app.use(miSend())
}
```

修改app.js:
```js
const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')

middleware(app)
router(app)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
```

Ok,中间件的目录就创建完成了,然后我们修改home.js,在其中一个controller调用这个中间件:
```js
 ctx.send({
       status: 'success',
       data: '流量'
 })
```
浏览器打开,就能看到效果了.这意味着,你刚刚使用中间件send拓展了ctx对象.

Ps:目录结构如下:
![](DraggedImage-1.png)
代码提交记录:
[https://github.com/ethluz/koa2-apiserver-mvp/commit/ce9f295c05d9a1dfa487a60584ccff93bd9e402e](https://github.com/ethluz/koa2-apiserver-mvp/commit/ce9f295c05d9a1dfa487a60584ccff93bd9e402e)

### 4.实时反馈的node启动&开发环境变量&
*代码修改的实时反馈*
实时反馈即代码修改后,可用自动启动node,而无法手动退出当前node,重启服务.
我们这里用nodemon,首先安装它
```bash
npm i nodemon -save
```
然后修改package.json的scripts:
```js
"start": "node app.js"
```
改为:
```js
"start": "nodemon app.js"
```

*环境变量-区分开发环境&线上环境本地等*
如果我们的产品是开源代码的,又或者区分正式环境和测试环境(几乎肯定是要分的).那他们所连接的数据库,一些配置就必然不一致,如果直接去改代码就不合适了.
而nodejs提供了node\_env 切好就是直面这个问题的.我们继续修改package.json的scripts:
```js
"start": "export NODE_ENV=dev && nodemon app.js",
"prd": "export NODE_ENV=product && nodemon app.js",
```
这样运行 npm run start就是启动开发环境,而prd则是正式环境了.然而还有一个问题,命令是不同了,但是代码里如何获取node\_env的值呢?
在app.js底部添加下面的代码,运行时,看shell中的输出即可:
```js
console.log('\n app.env: \n',app.env);
console.log('\n app.env: \n', process.env);
```
app.env是koa提供的获取环境变量的对象属性.

*model层:sequelize+postgresql的使用*
sequelize能支持mysql,postgre和mongodb等.并提供几乎一致的orm.且具备足够的易用性影响力,因此推荐.
*sequelize的配置:*
我们创建db.js保存Sequelize的初始化和基本配置
```js
import Sequelize from 'sequelize';

const sequelize = new Sequelize('数据库名', '账户', '密码', {
    host: '连接主机',
    port: 5432, //端口
    dialect: 'postgres', //数据库,这里我们用postgre,你也可以选择mysql
    dialectOptions: {
        ssl: true   //适用于postgre非常关键,远程连接postgre需要通过ssl
    },
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize.sync();

export default sequelize;
```
这部分也推荐看文档:[https://demopark.github.io/sequelize-docs-Zh-CN/getting-started.html](https://demopark.github.io/sequelize-docs-Zh-CN/getting-started.html)

有了上面,其实还没完,我们还要创建Model:
```js
import Sequelize from 'sequelize';

export default function(sequelize) {
  const users = sequelize.define('users', {
    password: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
      validate: { isLowercase: true }
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    }
  });
}
```
注:上面的代码并不需要创建id和createtime,因为sequelize会为我们自动添加上默认的.
Model的创建也可以查看文档:[https://demopark.github.io/sequelize-docs-Zh-CN/models-definition.html](https://demopark.github.io/sequelize-docs-Zh-CN/models-definition.html)

然后我们需要在最上面的db.js中载入这个model:
import 上面的model:
```js
import users from './models/users.model';

```
然后把初始化的sequelize对象传入model function中:(很明显的用了闭包):
```
users(sequelize);
```

那么如何用到这个model呢,我们在需要使用数据库的controller头部添加如下代码:**这里需要注意下sequelize.models.xx那一行,你在文档中很难察觉,切记**
```js
import sequelize from '../db';
//注意下面这个属性:
const users = sequelize.models.users;
```
sequelize.models.xx可以获取我们刚刚的users model对象,然后我们就可以随意的使用users.save() user.findAll()等等调取user对象的方法了. sequelize对model定义了哪些方法?请看:[https://demopark.github.io/sequelize-docs-Zh-CN/models-usage.html](https://demopark.github.io/sequelize-docs-Zh-CN/models-usage.html)

*sequelize的一点资料*
中文文档:
[https://demopark.github.io/sequelize-docs-Zh-CN/](https://demopark.github.io/sequelize-docs-Zh-CN/)
官方英文文档;

*添加日志功能*
新安装log4js模块用于管理系统日志.新增加日常中间件,并在middleware/inde.js中加载中间件. 运行将增加日志文件到当前目录.
[https://github.com/ethluz/koa2-apiserver-mvp/commit/fc90832a468a0162c3aa6c27a23afcc0a782463f](https://github.com/ethluz/koa2-apiserver-mvp/commit/fc90832a468a0162c3aa6c27a23afcc0a782463f)

*把日志中间件挂载到ctx&中间件的调用*
[https://github.com/ethluz/koa2-apiserver-mvp/commit/7a6083729041c71e26397fcef9ebda4a49b242a7](https://github.com/ethluz/koa2-apiserver-mvp/commit/7a6083729041c71e26397fcef9ebda4a49b242a7)

*完善日志功能,按日期分割日志文件,并设置专有目录*
[https://github.com/ethluz/koa2-apiserver-mvp/commit/7195a00b4a0b176b8f58a155fcbcac7ebad0944d](https://github.com/ethluz/koa2-apiserver-mvp/commit/7195a00b4a0b176b8f58a155fcbcac7ebad0944d)

*灵活的日志配置及添加客户端信息到日志*
[https://github.com/ethluz/koa2-apiserver-mvp/commit/0204d238ebbead351db2c9bb92a2adb247953fb1](https://github.com/ethluz/koa2-apiserver-mvp/commit/0204d238ebbead351db2c9bb92a2adb247953fb1)
*记录用户ip*
[https://github.com/ethluz/koa2-apiserver-mvp/commit/36c4a66fc7eaae80b1cdda839fa51767c53799c8](https://github.com/ethluz/koa2-apiserver-mvp/commit/36c4a66fc7eaae80b1cdda839fa51767c53799c8)
