---
templateKey: blog-post
title: 开发者玩转以太坊1.0的所有测试网
date: 2018-12-17T15:04:10.000Z
description: 当前没有添加eth2.0的任何网络，后续会更新
tags:
  - 区块链
  - 以太坊
---

# 开发者玩转以太坊测试网

说说ethereum的测试网,大家在日常编写合约,部署,调用时,如果直接走主网显然是不合适的(真金白银啊)

恰好以太坊存在测试网络，主网好比我们做传统互联网项目开发的prd环境.而以太坊的测试网络好比dev环境.
*测试网的重要用途:*在无需真金白银的情况下,部署合约,玩转测试网下的dapp.
当前以太坊测试网,有:kovan, ropsten,rinkeby.
那么，他们之间有没有差异呢?

## 以太坊的测试网差异

#### 测试网客户端不同
*rinkeby：*
Poa共识机制,客户端只有geth一种.
*Kovan：*
parity客户端的,采用poa共识机制,生态上和主网接近,因为有大量的明星项目的测试合约部署在kovan网络上.
*Ropsten*
geth,parity两种客户端都有, 和主网一样采用pow的共识机制.

在开发上,ropsten和主网共识是一致的,区块高度也类似,也可以挖ropsten的币(虽然没啥意义).但速度体验上是慢的.不如Kovan和rinkeby那般丝滑顺爽.


#### 测试网的生态不同

*Makerdao*
Makerdao的测试环境在kovon网络下,其所有的测试合约都部署在kovan测试网.
可参考:[https://mp.weixin.qq.com/s/pPYPY9LNQKmNKEwCkvN9Tg](https://mp.weixin.qq.com/s/pPYPY9LNQKmNKEwCkvN9Tg)

*kyber.network(knc)*
Knc比较良心了,三种测试网络全支持,可参考,kyber的开发者文档:
[https://developer.kyber.network/docs/RopstenEnvGuide/](https://developer.kyber.network/docs/RopstenEnvGuide/)
[https://developer.kyber.network/docs/KovanEnvGuide/](https://developer.kyber.network/docs/KovanEnvGuide/)
[https://developer.kyber.network/docs/RinkebyEnvGuide/](https://developer.kyber.network/docs/RinkebyEnvGuide/)

*0x协议(含2.0)*
想体验最新的0x,以及免费测试,还是kovan网络.

*polymath(sto龙头项目)*
polymath的测试环境也是kovan
大家可以在kovan测试网中体验一把他们官方出的发行sto的dapp:
https://tokenstudio.polymath.network

*aragon*
Aragon从最初的测试环境就是在kovan上.免费玩aragon自然上kovan.

以太坊网络无论主网,测试网,都需要消耗gas,主网中大家需要使用真金白银的eth,而测试网中的eth是可以免费领取的.所以:

## 测试网eth领取方式:
rinkeby测试网的领取:
[https://faucet.rinkeby.io/](https://faucet.rinkeby.io/)
Ps:为了防止多领,资源浪费.此水龙头,需要翻墙,在twitter,google+上发布一条消息,附带上您的公钥地址,并把消息链接填写进去,选择领取方式即可.

Kovan测试网,水龙头(需要先用github登陆)
[https://faucet.kovan.network/](https://faucet.kovan.network/)

ropsten：
[https://faucet.ropsten.be/](https://faucet.ropsten.be/)


## 支持切换测试网的dapp浏览器,钱包.
pc: *Metamask*
作为大家日常开发区块链应用的必备,metamask具有非常简易的切换方式,并且提供了上面的领取水龙头(faucet,行规叫水龙头,免费领水喝的意思😂)
![](https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/184253.png)

手机端:*status*
Status作为手机钱包,dapp浏览器,聊天工具.以及未来的分片轻节点,支持poa,主网,rinkeby和ropsten的切换,当然,您也可以自己添加:
![](https://blockluz-1253389096.cos.ap-beijing.myqcloud.com/blockman/184338.png)

## 测试网的节点获取
Infura去申请,其提供从主网到三个测试网的rpc节点服务.

*自行搭建:*
Geth可以部署Ropsten和rinkeby网络节点,你也可以用geth参数内输入test即可.
parity可以选择Kovan

