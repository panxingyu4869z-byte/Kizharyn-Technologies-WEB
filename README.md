# 岐曌KI · Kizharyn Technologies 官网

中文、英语和德语各五页：首页、研究、产品、关于我们、联系合作。共用米白、深绿及衬线标题的视觉样式。中文在根目录，英语在 en/，德语在 de/；页首可切换到当前页面的其他语言。

## 使用

可直接打开 index.html，也可使用 Node.js 22 或以上版本运行：

```sh
npm ci
npm run build
npm start
```

本地预览：http://127.0.0.1:4173。

英语：http://127.0.0.1:4173/en/。德语：http://127.0.0.1:4173/de/。

## 中文版 LIE 入口

首页的 LIE 入口先进入官网产品页；中文版产品页的“体验 LIE”连接 https://demo.kizharyn.com/。英语和德语版保留本语言产品介绍和咨询入口，不提供演示链接。

公网地址统一维护在 content/site.mjs 的 lieAppUrl 中。官网使用普通页面链接，不需要本机 LIE 服务或跨域 API 代理；官网表单信息不会传给 LIE。当前仅验证公网入口的访问与页面身份，未在公网执行计算或修改数据。

## 验证

```sh
npm run check
npm test
npx playwright install chromium
npm run test:browser
```

浏览器运行所需 Chromium 在首次验证前安装。网站运行本身不依赖任何第三方前端包。浏览器检查会验证“中文首页 → 产品页 → 公网 LIE”的跳转及页面标题，需要网络连接；不提交计算或调用写入接口。

## 内容与构建

- content/site.mjs：共享品牌、邮箱、研究定义和产品定位。
- content/locales/：三语正文、导航、元信息、表单及邮件文案，使用相同字段。
- scripts/build.mjs、scripts/templates.mjs：生成三语十五页 HTML，共用导航、页脚和页面结构。
- assets/wireframe.css：沿用既有配色的桌面与移动端样式。
- assets/wireframe.js：联系意向预选、校验、邮件草稿与复制交互。
- tests：静态服务、三语链接与切换、响应式、键盘、联系交互及公网 LIE 跳转。

更新共享文案或模板后运行 npm run build。把包含十五页 HTML、en/、de/ 和 assets 的静态文件输出到指定目录：

```sh
node scripts/build.mjs ./dist
```

Vercel 使用仓库根目录的 vercel.json，执行 node scripts/build.mjs public，并将 public 作为输出目录。该目录包含十五页 HTML 和共享资源，不包含源码、测试或开发服务。本地 npm run build 仍更新根目录页面，供现有预览服务使用。

## 联系功能与发布限制

联系页当前生成邮件并允许复制内容，邮件需由访客在自己的邮件应用中确认发送。页面不调用接收服务，不自动发送或保存填表内容，不把生成草稿表示成消息送达。

沿用现有官网公开的 panxingyu4869z@gmail.com 与 p1172545066@163.com；邮箱实际送达尚未验证。

尚需公司主体资料与正式发布确认。若改为网页直接提交，需要真实接收服务、送达及重试验证，并按实际处理方式更新联系信息说明。

没有真实材料的进展、团队、合作机构和实验结果未形成公开区块；产品页不声称具体接口、部署形态或未经确认的版本能力。
