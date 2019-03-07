---
templateKey: blog-post
title:  iterm2 简易玩法
date: 2017-12-17T15:04:10.000Z
description: iterm的安装,主题配置,到提速(减少卡顿,打开加载慢的问题)
tags:
  - 减熵
  - 工具
---

*Iterm2*
到官网,自己查询安装方式.

*zsh *
mac通常都自带,如果没有zsh,则执行如下命令安装:
brew install zsh

随后,要安装oh-my-zsh:(用于管理zsh)
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"#设置iterm的主题:

#设置主题
+ iTerm2 > Preferences > Profiles > Colors Tab
+ 打开 Color Presets... 下拉到最底下,
+ 从选项里选择 Import... 
+ 然后选择主题所在位置,例如我用的: Dracula.itermcolors 
+ 在

Ps:我个人喜欢的主题:
[https://draculatheme.com/]
[https://draculatheme.com/zsh/]
其他一些主题资源:
主题官网:[https://iterm2colorschemes.com/]


#iterm提速优化
Iterm配置多了,永久了,其实是很卡的.我知道两个方式优化它:
*1.如果你安装了zsh(正常都会安装):*
iTerm2 > Preferences > Profile >  Command  
然后选择command,输入 /bin/zsh
(img)
解释下,默认安装好zsh,由于iterm很傻,还需要搜索配置,去找zsh的位置,并启动它,而这样配置,等于帮助iterm快速的启动zsh了.
*2.定期清理缓存*
sudo rm -rf /private/var/log/asl/*.asl

#环境变量的特别提醒
安装了zsh,就不在是bash的环境变量位置了.基本上是在当前用户跟目录有一个.zshrc文件,通常在遇到需要配置环境变量的时候,使用vim打开它,bash怎么配置,它就怎么配置:
 vim ~/.zshrc

