---
templateKey: blog-post
title: Git的使用指南
date: 2017-12-17T15:04:10.000Z
description: git使用备忘录,作为即查的git使用指南够用,但如果作为入门学习或深入.还是看官方文档吧.
tags:
  - 工具
  - 后端
  - git
---
# 

## 必备知识点:
git流程:

仓库&分支
仓库:通常有一个链接地址,例如github的一个项目就是一个仓库:
我们推送本地仓库提交的代码时,通常是git push origin head:master 即是将代码提交到名为origin的远程仓库.

分支:一个仓库通常有多个分支,主要用途,区分开发环境,正式环境等.以及发布不同的开源版本.

**关于HEAD: **我们push时,git push origin HEAD:master 其中的HEAD实际上是指向默认分支的,他指向你git checkout xx中的xx.

## 场景化&命令组合
#### 日常提交代码必备流程:
```js
git status  //查看可提交的文件
git add .//也可以是git add xx.file 其中 git add .是添加所有内容
git commit -m '备注'  //将会提交git add的内容. -m后面的备注将记录到git中.

git push 仓库名称 本地分支:远程分支 //将本地分支提交到指定仓库的远程分支上.

```
当然 git add . 和git commit 也可以简写为:
```js
git commit -a -m 'added a new footer [issue 53]'
```

*1.可以先clone空代码库,再提交代码:*
```js
git status  //查看可提交的文件
 
git clone https://github.com/facebook/react/

 git add .//也可以是git add xx.file 其中 git add .是添加所有内容

 git commit -m '备注' //将会提交git add的内容. -m后面的备注将记录到git中.

 git push 仓库名称 本地分支:远程分支 //将本地分支提交到指定仓库的远程分支上.


```

*2.先初始化,再提交(适用于代码库空置)*
```js
 git init

 git add .	

 git commit -m '备注'  //将会提交git add的内容. -m后面的备注将记录到git中.
 git push 仓库名称 本地分支:远程分支 //将本地分支提交到指定仓库的远程分支上.

```


#### 如何恢复之前的版本:(writing…)
```js
git log //查看之前版本
git reset //恢复
git push [仓库] [本地分支]:[远程分支]

```

#### 连接多个远程仓库,并使用:
首先push第一个仓库：
```js
git remote add  {仓库名1}  {giturl}
```

其次,push第二个仓库
```js
git remote add  {仓库名2}  {giturl}
```
 
####  避免提交的代码&忽略的内容:
根目录下创建文件*.gitignore * 并添加内容,例如:
```bash

# 此为注释 – 将被 Git 忽略
# 忽略所有 .a 结尾的文件
*.a
# 但 lib.a 除外
!lib.a
# 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
/TODO
# 忽略 build/ 目录下的所有文件
build/

#会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
doc/*.txt
# 忽略 doc/目录下所有扩展名为 txt 的文件
doc/**/*.txt


```

*git clone:*  clone指定分支
git clone -b  {分支名称}   {url}
例如:(将会clone react的facts分支)
```js
git clone -b facts https://github.com/facebook/react/
```

#### 必备查询:
查询文件更改状态
```js
git status
```

最近提交记录
```js
git log
```


查看远程分支:
```js
git remote -v
```
查看远程仓库全部信息:
```js
git remote show [remote-name] //查看远程仓库remote-name的信息
```
修改远程仓库名称
```bash
git remote rename [remote-name-old]  [remote-name-new] 
```
删除远程仓库 
```bash
git remote rm [remote-name]
```

新建分支
```bash
git branch [branch-name]
```
查看所有分支:
```bash
git branch
```
合并分支
```bash
//将branch-name1合并到branch-name2
git checkout  [branch-name1] 
git merge [branch-name2]
```

#### 推荐你去阅读官方
[https://git-scm.com/book/zh/v2](https://git-scm.com/book/zh/v2)