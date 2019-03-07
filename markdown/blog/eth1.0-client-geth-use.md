---
templateKey: blog-post
title: 以太坊1.0下,Geth的安装&使用&文档资源
date: 2018-12-17T15:04:10.000Z
description: 以太坊1.0下,Geth在不同环境下的安装,启动命令,docker下的使用,以及geth的开发资源,文档等.
tags:
  - 区块链
  - 服务端
  - 以太坊
---
# 理论:
以太坊1.0下采用pow共识机制,每个节点,都有区块链的数据,而在设计时考虑到不同的需求,硬件环境等,特提供了3种方式,允许节点不必完整区块数据.
## 同步模式:
+ *fast:* 
启动快速区块同步模式，在同步到最新区块后，转化为正常区块同步模式.
+ *full:*
同步所有区块，会拥有完整的区块链数据.
+ *Light:*
轻节点模式，只会同步区块头信息，可以完成基本的命令操作.

## 安装方式
官方网站:[https://geth.ethereum.org/downloads/](https://geth.ethereum.org/downloads/)
Ubuntu包:
```js
sudo add-apt-repository -y ppa:ethereum/ethereum

sudo apt-get update
sudo apt-get install ethereum

```
Mac下 homebrew:
```js
brew tap ethereum / ethereum
brew install ethereum
```
docker?(文章后面有docker的讲解)

## 后台运行
**why?**
后台允许,允许你断开和服务器的连接(假设你的geth安装在某个主机上)后,依旧在运行同步数据.
*方式1:nohup*
```js
nohup  geth --datadir "./data" &
```
*方式2:pm2  *
```js
pm2  geth --datadir "./data" &
```

*后台运行如何启动console(和geth交互,调用geth命令)*
```bash

geth attach ipc:./data/geth.ipc
```
ipc后面的部分根据上面 启动时,--datadir的目录而定.千万别造抄.如果我们上的—datadir 目录是”/” ,那么我在这里ipc后面接着的应该是:ipc:/geth.ipc

##普通运行:(进程关闭,则停止)
```js
geth --datadir "./data" 
```

####使用场景角度使用geth启动参数
其次geth有一堆命令,我们按场景来定,如我们想再ropsten网络上启用快速的节点,并且后台运行,则:
```bash
 
nohup geth --datadir "~/data" --syncmode "fast" --testnet & 
```

如果还想让它启用rpc接口,并且开发一些api,rpc的端口想设定为8080,则:
```bash
nohup geth --datadir "~/data" --syncmode "fast" --rpc  --rpcapi "db,eth,net,web3" --rpcport "8080" --testnet & 
```

如果我们不后台运行呢?(去掉nohup和&)
```bash
geth --datadir "~/data" --syncmode "fast" --rpc  --rpcapi "db,eth,net,web3" --rpcport "8080" --testnet 
```

####console常用命令:
*查看区块同步状况*
```bash
eth.syncing
```
这个命令会返回false或者一个同步状态的数组;有两种情况会返回false，一是还没找到任何节点，并且没有开始同步，二是找到节点了并且已经同步到最高块;如果返回数组则表示正在同步，并输出最高块和当前同步的块高

*查看当前同步的区块高度*
```bash
eth.blockNumber
```

##docker 中使用
docker下,pull此镜像:
```bash
docker pull ethereum/client-go
```

如何启用?
```bash
docker run -it -p 30303:30303 ethereum/client-go
```
如上面的命令,我们启动了 geth在正式网的挖矿. 其中30303:30303为端口映射.
既将docker中的端口映射到主机本身的端口上. 

如何添加geth启动的参数呢?如正式网,测试网呢?

关于docker的使用,可我写的这篇文章:https://ethluz.github.io/blog/docker-learndocker/

#其他关于geth的资料
####Rpc相关的API wiki(官方):
[https://github.com/ethereum/wiki/wiki](https://github.com/ethereum/wiki/wiki)

####使用golang开发geth的拓展(学习go语言区块链开发)
[https://goethereumbook.org/](https://goethereumbook.org/)

####读取geth等以太坊客户端的数据,为交易数据查询服务:
*1.EtherSQL：Python脚本*
抓取节点数据，并保存到postgresql上，可使用sql查询区块链数据，主要依赖：web3.py， SqlAlchemy等库。

 + 下载：[https://github.com/analyseether/ether\_sql](https://github.com/analyseether/ether_sql)
 + 文档：[https://ether-sql.readthedocs.io](https://ether-sql.readthedocs.io)


*2.Presto-Ethereum：以太坊客户端的Presto连接器*
来自雅虎的华人工程师，java所写，用这个连接器，人们就可以开始使用以太坊区块链分析工作，而无需知道如何使用细节Javascript API。
+ 文档和安装：[https://github.com/xiaoyao1991/presto-ethereum](https://github.com/xiaoyao1991/presto-ethereum)

####Geth源码解读
[https://github.com/ZtesoftCS/go-ethereum-code-analysis](https://github.com/ZtesoftCS/go-ethereum-code-analysis)