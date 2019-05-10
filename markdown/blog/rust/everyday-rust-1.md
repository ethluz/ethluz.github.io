---
templateKey: blog-post
title: rust学习资料汇总
date: 2018-11-03T15:04:10.000Z
description: 学习rust吧,拥抱wasm,拥抱rust区块链开发.本文包含:开发环境搭建,学习教程,区块链和wasm相关.
tags:
  - 智能合约
  - rust
  - 后端
  - 区块链
---

# Every  day of Rust: 1th 

## 开发环境搭建
**在线ide,无需安装,即刻练习rust:**

[https://play.rust-lang.org/](https://play.rust-lang.org/)

**安装rust:**

官方出的,当前rust1.3版本:
```js
curl https://sh.rustup.rs -sSf | sh
```
其他安装方式:
[https://www.rust-lang.org/zh-CN/other-installers.html](https://www.rust-lang.org/zh-CN/other-installers.html)
当然,brew apt-get yum都是可以快速安装的.

**安装包管理工具carge**

类似nodejs的npm,yarn,python的pipenv


## 入门教材

**官方网站**

[https://www.rust-lang.org/zh-CN/](https://www.rust-lang.org/zh-CN/)

**丰富的rust中文教程(众多版本的入门系列)**

[https://www.yuque.com/progfun/rust/](https://www.yuque.com/progfun/rust/)

**Rust 的绅士介绍**

[http://llever.com/gentle-intro/readme.zh.html](http://llever.com/gentle-intro/readme.zh.html)
![](http://llever.com/gentle-intro/PPrustS.png)

**mdn的rust视频系列**

[https://developer.mozilla.org/zh-CN/docs/Mozilla/Rust](https://developer.mozilla.org/zh-CN/docs/Mozilla/Rust)

## 深入教程
**rust程序设计 (The Rust Programming Language) **
中文版:[https://kaisery.github.io/](https://kaisery.github.io/)
原版:[https://doc.rust-lang.org/](https://doc.rust-lang.org/)
另一个中文译本:[http://rustdoc.saigao.fun/](http://rustdoc.saigao.fun/)

**Rust的web后端框架**

 适合对rust有一定入门之后,且接触过其他语言的web后端开发,可快速的对rust建立进一步的熟悉.
[https://rocket.rs](https://rocket.rs)

**cargo包管理工具文档**

[https://doc.rust-lang.org/stable/cargo/](https://doc.rust-lang.org/stable/cargo/)

**学习wasm,用rust可以写wasm**

+ WebAssembly概念理解:
	[https://developer.mozilla.org/zh-CN/docs/WebAssembly](https://developer.mozilla.org/zh-CN/docs/WebAssembly)
+ rust写wasm:
	[https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust\_to\_wasm](https://developer.mozilla.org/zh-CN/docs/WebAssembly/Rust_to_wasm)
+ 用rust webassembly写react扩展(非常经典的案例)
	[https://www.fullstackreact.com/articles/rust-react-and-web-assembly/](https://www.fullstackreact.com/articles/rust-react-and-web-assembly/)	


## rust的区块链开发
**采用rust开发的知名项目:**

Zcash, Parity客户端,国产的nervos等等.

#### 区块链开发框架
**substrate**

没错,gavin wood用substrate 在新Mac上,15分钟发新区块链.rust可以用它拓展substrate.也可以用rust写合约.
官网:[https://www.parity.io/substrate/](https://www.parity.io/substrate/)
github(包含使用文档):[https://github.com/paritytech/substrate](https://github.com/paritytech/substrate)

**exonum**

使用exonum,可以快速开发出数千tps公有链,以及更高tps的私链,需要注意exonum不提供智能合约,其将合约抽象成了service.
[https://exonum.com/](https://exonum.com/)


####  rust wasm写智能合约
**开发eos智能合约的案例:**

[https://www.sales4k.com/blockchain/eos-contracts-rust-no-cpp/](https://www.sales4k.com/blockchain/eos-contracts-rust-no-cpp/)

Etheruem2.o将推出ewasm,支持rust写以太坊智能合约?恩可能的.
