# 密林博客

> Node.js 学习结束的一个项目练习，但只完成了登陆和注册，很可惜！
>
> 当做密林播客的试验品
>
> 以后会完成整个项目，挖坑！挖坑！挖坑！

## 目录结构

```
|-- models                      ---  mongoDB数据库模板
|-- node_modules                --- 包
|-- public                      --- 资源文件夹
	|-- css
	|-- js
	|-- img
|-- view                        --- 视图
	|-- _layouts                --- 模板
		|- home.html            --- 主模板
	|-- _partials               --- 子模板
		|- fooer.html           --- 尾部子模板
		|- header.html          --- 头部子模板
		|- setings-nav.html     --- 设置子模板
	|-- settings
	|-- topic
	|- demo.html
	|- index.html               --- 主页
	|- login.html               --- 登录页
	|- register.html            --- 注册页
|- app.js                       --- 入口函数
|- router.js                    --- 路由

```



## 路由设计

| URL         | 请求类型 | data                | 作用         |
| ----------- | -------- | ------------------- | ------------ |
| '/'         | GET      | null                | 渲染首页     |
| ’/login‘    | GET      | null                | 渲染登陆页   |
| '/login'    | POST     | {body:登陆用户数据} | 处理登陆请求 |
| '/register' | GET      | null                | 渲染注册页面 |
| '/register' | POST     | {body:新用户数据}   | 处理注册请求 |



## 表结构设计

### User

| 字段               | 说命         | 类型   | 约束             | null  | 默认                           |
| ------------------ | ------------ | ------ | ---------------- | ----- | ------------------------------ |
| email              | 邮箱         | String |                  | flase |                                |
| nickname           | 昵称         | String |                  | flase |                                |
| password           | 密码         | String |                  | flase |                                |
| created_time       | 创建时间     | Date   |                  | true  | Data.now                       |
| last_modified_time | 最后修改时间 | Date   |                  | true  | Date.now                       |
| avater             | 头像         | String |                  | true  | /public/img/avatar-default.png |
| bio                | 介绍         | String |                  | true  | ' '                            |
| gender             | 性别         | Number | enum: [-1, 0, 1] | true  | -1                             |
| birthday           | 生日         | Date   |                  | true  |                                |
| status             | 状态         | Number | enum: [0, 1, 2]  | true  | 0                              |

## 接口

#### 登陆

| 地址   | 请求方式 | 参数             |
| ------ | -------- | ---------------- |
| /login | post     | {email,password} |

| 返回码         | 说明       | message                |
| -------------- | ---------- | ---------------------- |
| err_code：0    | 登陆成功   | Ok                     |
| err_code：1    | 登录失败   | 邮箱或者密码错误       |
| err_code ：500 | 服务器出错 | 服务器忙，请稍后重试！ |

#### 注册

| 地址   | 请求方式 | 参数             |
| ------ | -------- | ---------------- |
| /register | post     | {email,password,nickname} |


| 返回码         | 说明       | message                |
| -------------- | ---------- | ---------------------- |
| err_code：0    | 注册成功   | Ok                     |
| err_code：1    | 邮箱已存在   | 邮箱已存在       |
| err_code：2 | 昵称已存在 | 昵称已存在 |
| err_code ：500 | 服务器出错 | 服务器忙，请稍后重试 |
## 密码md5加密

```shell
npm i blueimp-md5

var md5 = require('blueimp-md5');

userBody.password = md5(md5(password));
```