---
templateKey: blog-post
title:  python的多语言版本和依赖包&隔离环境管理:pipenv+pyenv+autoenv
date: 2018-12-17T15:04:10.000Z
description: 18年期间最优的python多版本和项目库管理方式.比docker更快.比pip+virtualenv更高效简单
tags:
  - 后端
  - python
---
熟悉nodejs的同学或者使用过前端react vue等的.都知道npm yarn这样的包管理神器.而切换node全局版本也可以使用nvm.当我们创建一个项目目录执行,npm init 即拥有了一个当前目录的依赖包环境.执行yarn add 或npm install即可安装相应的依赖库. 

而python早期有pip,可以在全局安装依赖库,后来又拥有了virtualenv这种隔离的环境.但是都无法做到做到nodejs的方便.但是技术总是会进化的:

*开始之前我们先介绍一下pipenv,pyenv以及autoenv,可对比nodejs:*
*pyenv:*类似于nvm用于安装不同版本的python语言.甚至pyenv命令也和nvm类似.
*Pipenv:*用于取代pip和virtualenv. 她比pip拥有更强大的包管理功能.有具有virtualenv的隔离沙盒环境.它很好的将这两者合二为一了.但是pipenv依旧有缺陷,我们进入项目目录,无法自动切换沙盒环境.找到对应的安装依赖.
*Autoenv:*autoenv正式解决pipenv唯一没有解决的难题,无需手动激活虚拟环境.进入目录即可激活!

## 一.pipenv+autoenv+pyenv的安装
#### 安装pipenv

```bash
pip install pipenv
```

#### 安装autoenv
*Mac OS X 使用 Homebrew 安装*
```bash
$ brew install autoenv
# bash 使用这条命令
$ echo "source $(brew --prefix autoenv)/activate.sh" >> ~/.bash_profile
# zsh 使用这条命令
$ echo "source $(brew --prefix autoenv)/activate.sh" >> ~/.zshrc
```

*pip安装*
```bash
$ pip install autoenv
# bash 使用这条命令
$ echo "source `which activate.sh`" >> ~/.bashrc
# zsh 使用这条命令
$ echo "source `which activate.sh`" >> ~/.zshrc
```

*git安装*
```bash
$ git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
# bash 使用这条命令
$ echo 'source ~/.autoenv/activate.sh' >> ~/.bashrc
# zsh 使用这条命令
$ echo 'source ~/.autoenv/activate.sh' >> ~/.zshrc
```

#### 安装pyenv
 github（有安装教程）：[https://github.com/pyenv/pyenv](https://github.com/pyenv/pyenv)
或者使用brew：
```bash
brew update
brew install pyenv

```
接着,*一定要配置环境变量*,在.zshrc, bash\_profile中添加:(如果不添加,pipenv将无法识别python版本)
```bash
export PATH="$HOME/.pyenv/bin:$PATH"
eval "$(pyenv init -)"
```

## 二.pipenv+autoenv+pyenv的使用
####  设置python版本-pyenv使用:
```bash
#安装3.6python
pyenv install 3.7.0
 #查看可安装的版本
pyenv install --list

# 显示安装的python版本
pyenv versions

#查看当前python版本
pyenv version
```

#### pipenv的基本使用
进入空目录,如果系统没有想要的python版本,需要用pyenv安装python版本.如果系统已有该版本,则使用pipenv 创建该版本的虚拟环境:
```bash
 #查看系统中的python版本:
pyenv versions

* system (set by /Users/luz/.pyenv/version)
  3.6.5
  3.7.0
 # 使用其中一个版本创建当前目录的沙盒环境
pipenv --python 3.6.5


```
如果不需要切换语言版本,也可以这么创建沙盒环境:
```bash

  
pipenv install

```
这样只是创建了一个类型于node中的package.json的文件:
Pipfile  Pipfile.lock等文件.这类似npm init命令.当然有所区别,python需要手动激活Pipfile中配置的依赖关系环境:
```bash
 #通过这个命令激活
pipenv shell
```
激活才算是进入一个沙盒中的依赖环境.然后可以用pipenv 代替pip去安装当前沙盒环境的依赖包:
```bash
 #通过这个命令激活
pipenv install flask django
```
是的flask,django都只属于当前这个沙盒环境.不信,你在pipenv后看看Pipfile中多了什么!

#### 如何省掉手动激活(进入目录就激活虚拟环境)?—— autoenv的用法:
当我们在运行pipenv shell去激活沙盒环境时,系统会返回这个环境的位置:
```bash
pipenv shell
Launching subshell in virtual environment…
 . /Users/luz/.local/share/virtualenvs/flask-site-9FpTxb5n/bin/activate
```
使用echo命令把这段内容+source存放在.env文件里.(.env为autoenv识别的文件.它会根据.env中存在的内容自动化执行一些行为):
```bash
echo "source /Users/luz/.local/share/virtualenvs/flask-site-9FpTxb5n/bin/activate">>.env
```
特别要注意.env文件开头时source,复制pipenv shell的结果时要注意.
*注意:*当你设置.env文件后,重新用命令进入这个文件将会提示你:
![](DraggedImage.png)
输入y即可.