# xinxin服务号开发

## 一、基础

### 1、微信分享场景

- 线下推广、线上传播
- 分享渠道：H5、小程序、App

- 分享方式：好友、盆友圈、QQ好友、微博（新浪）、QQ空间



### 2、微信分享收益

拉新、留存、提升粘性、品牌传播

格式统一，自带标题、简介和LOGO



### 3、申请测试号

http://mp.weixin.qq.com/debug/cgi-bin/sandboxinfo?action=showinfo&t=sandbox/index



```
测试号信息
appID				wxfebf1f2f297529c4
appsecret		f2e39b37ee92c92cfdb7098e9291badc
```



### 4、用户授权流程

- 引导用户进入授权页面同意授权，获取code
- 通过code换取网页授权access_token（与基础支持中的access_token不同）
- 如果需要，开发者可以刷新网页授权access_token，避免过期
- 通过网页授权access_token和openid获取用户基本信息（支持UnionID机制）

包: request / memory-cache
流程: 
- Vue 调用 Node
- Node 调用微信, 根据返回 code 获取 openid
- 向 client 写入 Cookie

### 5、JSSDK调用流程

调用分享、支付、扫一扫必用！！！

- 绑定域名
- 引入 JS 文件
- 通过 config 接口注入权限验证配置（ 接口签名 ）
- 通过 ready 接口处理成功验证



## 二、前端
见前端仓库README.md



## 三、后端
express / mongoDB / memory-cache ( 暂时替代 Radis )

```shell
yarn add request memory-cache --save-dev
```



### 微信用户授权

- 微信授权跳转

- 根据 code 获取 openid
- 向客户端写入 Cookie 返回 Client
