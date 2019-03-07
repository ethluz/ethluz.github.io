---
templateKey: blog-post
title: react开发入门:1.入门react项目创建,代码结构
date: 2018-12-17T15:04:10.000Z
description: 用脚手架创建一个react项目,并理解react项目的代码结构.
tags:
  - react
  - web3
  - 前端
  - dapp
---

React是基于组件，虚拟dom的前端开发框架。

所谓基于组件即react中是一个组件嵌套一个组件，组件可复用。所谓虚拟dom，既react中的视图，是虚拟的，全部是js，而非html。

## 初识组件
一个组件的构成：
```js
import React, { Component } from 'react'

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
```


第一行中，import from 是es6中的语法，具体es6的教程学习，可参考廖雪峰大神的博客。
语法中的class也一样是es6. 可以类比其他面向对象的语言。

其中的render方法，用于加载视图，在return中写入JSX。
```js
render() {
	...
}
```


*关于jsx*可参考[](https://react.docschina.org/docs/introducing-jsx.html "react官方文档的解释。")
Jsx日常使用需注意要点：
其实就是html的语法，但直接复制html是否可以？不行。需要做两步转换：1.class变成className 2.标签结尾用/闭合。
```js
 <div className="control has-icons-left has-icons-right">
 	<input className="input is-info" type="text" placeholder="小数点位数" onChange={this.decimalSet} />
 </div>                         
```
如上面的代码，仔细看input，就是在结尾加入了，“/”。在看看className.
当然其中也可以使用js的变量或调用当前组件class中的方法，例如上图中的: 
```js
{this.decimalSet}
```
## 初始化脚手架：create-react-app

关于npm yarn等如何使用，可自行搜索。他们都是nodejs时代必备的工具。
使用 `npm -g install create-react-app`即可安装

使用create-react-app创建一个项目：
```js
create-react-app daopark
```
然后进入进入darpark，安装依赖包
```js
cd daopark
yarn install 
```

##  目录结构解析

![](https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/DraggedImage.4b1e51fe6c7b4d13bdfb4d558636c984.png)
*Public：*
所有编译通过的都会出现在这个目录下。
*Src：*
我们日常开发的目录，其中index.js是入口， app.js是index.js中引入的第一个组件。css则是样式，create-react-app默认使用es6.所以我们会注意到，开头的：`import  *  from *`

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

*最后，package.json文件：*
打开它，看看内容：
```json
{
  "name": "daopark",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.5.1",
    "react-dom": "^16.5.1",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }
}
```

scripts中，是运行，其中，start是dev环境下的运行，build为编译。对于scripts中的命令，我们可使用npm run 或yarn 运行。例如，我们先直接运行：
```json
 yarn start
```
然后看到：
![](https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/DraggedImage.570b5810575448d1bf6d57d9be73df05.png)
在浏览器中打开[http://localhost:3000/](http://localhost:3000/)：
![](https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/DraggedImage.98d07d1120474c3b858a46103e3c18c4.png)
作业：修改其中的：welcome to react  为：欢迎来到dao世界





