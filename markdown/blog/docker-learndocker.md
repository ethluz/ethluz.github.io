---
templateKey: blog-post
title: docker的使用
date: 2017-12-17T15:04:10.000Z
description: docker安装,docker+nodejs,doker+python爬虫的使用案例,docker文档资源等
tags:
  - docker
  - 服务端
---
# docker使用,Python+nodejs为例

####   使用docker的流程
+ 1.cd到项目目录下(例如web网站根目录,nodejs就是package.json所在目录).
+ 2.编写Dockerfile(后面回介绍dockerfile的使用)
+ 3.创建image: (在Dockerfile所在的目录下)	
	```json
		docker build -t  \{image\_name} .  
		```

	```bash
		docker images #可查看有哪些image
		```
+ 4.运行容器:
	```bash
		# 控制台执行
		docker run -p {系统端口}:{容器端口} {image\_name} . 
		# 后台运行
		docker run -d -p {系统端口}:{容器端口} {image\_name} . 
		```

#### 常用命令
查看daocker正在运行的容器: 
```bash
docker ps  
CONTAINER ID        IMAGE               COMMAND                CREATED             STATUS              PORTS                  NAMES
0219df69bd3d        binstd-service      "pm2-runtime app.js"   45 seconds ago      Up 44 seconds       0.0.0.0:80->3000/tcp   competent_raman
```
关闭正在运行的容器 :
```bash
 docker stop  CONTAINER_ID #上面 docker ps看到的 containid
```
执行容器内的命令:
```bash
#后面的cmd可以是任意的shell命令
sudo docker exec -it CONTAINER_ID  cmd.. 

```

#### python的docker环境:
Python的另一个例子,参考官方文档:
[https://docs.docker-cn.com/get-started/part2/](https://docs.docker-cn.com/get-started/part2/)

#### nodejs的docker环境
以我在github上的koa2-mvp为例(一个集成了数据库,api,系统日志,错误处理,ES6)为一体的项目框架).
```bash
# 将官方 node:carbon 运行时用作父镜像
FROM node:carbon

# 收到添加pm2的方式,注意看结尾的CMD
# 也可以查看文档: http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/
RUN npm install pm2 -g

# 设置环境变量
ENV NODE_ENV=production



# 将工作目录设置为 /app
WORKDIR /app

# 将当前目录内容复制到位于 /app  中的容器中
ADD . /app

# 如果你需要构建生产环境下的代码，请使用：
# RUN npm install --only=production
RUN npm install

# 使端口 3000 可供此容器外的环境使用
EXPOSE 3000

# 在容器启动时运行 app.py
# CMD ["python", "app.py"]
# CMD [ "npm", "prd" ]
CMD ["pm2-runtime", "app.js"]


```

执行容器内的命令,查看容器的nodejs版本:
```bash
sudo docker exec -it 0219df69bd3d node -v 
```


辅助文档:


#### docker必备命令
*使用容器中的命令*



*保证docker的守护进程*
```js
 --restart=always
```



附文档:
docker中文文档:
[https://docs.docker-cn.com/](https://docs.docker-cn.com/)

docker中使用pm2+nodejs (pm2本身是守护进程+多进程分配.因此难以抛弃,因为docker开多个不同端口容器太占据资源)
[http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/](http://pm2.keymetrics.io/docs/usage/docker-pm2-nodejs/)

Dockerfile


