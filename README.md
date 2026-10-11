# 岐曌KI · Kizharyn Technologies 官网

中文、英语和德语各五页：首页、研究、产品、关于我们、联系合作。中文在根目录，英语在 en/，德语在 de/；语言切换进入当前页面的对应版本。

## 本地预览

使用 Node.js 22 或以上版本：

```sh
npm ci
npm run build
npm start
```

预览地址为 http://127.0.0.1:4173。代表页面：

- 首页：http://127.0.0.1:4173/index.html
- 产品：http://127.0.0.1:4173/product.html
- 研究：http://127.0.0.1:4173/research.html
- 联系：http://127.0.0.1:4173/contact.html?intent=product
- 英语：http://127.0.0.1:4173/en/
- 德语：http://127.0.0.1:4173/de/

采用中性白、石墨、深蓝一种配色与系统无衬线字体。共享 CSS 颜色角色与 Console 一致。研究摘要采用石墨背景；研究长页采用白色阅读界面。

## 页面与内容

首页顺序为公司方向、简短 LIE 产品摘要、Stalyra 研究摘要、交流入口。产品详情通过独立产品页进入；首页不展示样例标签或输入输出表。产品页显示四模块与 N01–N08 的用途、咨询接入状态和独立 Console 详情链接。目录不表示接口授权、服务开放或商业承诺。

产品样例复用企业 API 接入包 books-001 合成题与配套返回，区分任务目标、原文检查位置和固定返回的事实计数。样例展示不执行计算服务；事实计数不表示调用过 statistics API。配套输入和结果随标签一起切换，支持方向键、Home 和 End。公开研究资料注明类型、来源和发布日期未提供；概念说明不作为算法实现或实验成果证明。

Console 域名统一维护在 content/site.mjs，入口为 https://lie-cn.kizharyn.com/console/index.html。四模块进入 /console/modules/{task,diagnostic,action,state}.html；N 组进入 /console/capabilities/{N01..N08}.html。三语产品页均提供对应语言的 Console 目录，链接用 lang=zh/en/de 传递当前语言；三语产品页提供同一个中文 Demo https://lie-cn-demo-math.kizharyn.com/。Console 本地预览由 LIE-1 项目负责。生产入口使用这两个新域名；本地预览可使用下面的回环地址配置，保持 TLS 校验。官网由 Vercel 在 main 推送后自动发布，无需手动重复部署。

企业接入先明确业务场景、已有输入、预期结果与验收标准。补充测评及内容采用依赖企业授权题库或材料接口，具体能力与接口权限由项目交付确定。

## 构建与验证

```sh
npm run build
npm run check
npm test
# 本地三语、五页、表单、目录、键盘与移动端检查
npm run test:browser
# 先保持 npm start 运行，再生成本地截图
node scripts/capture-preview.mjs
```

首次使用浏览器测试时按需运行 `npx playwright install chromium`。tests/lie.spec.mjs 在本地验证首页到产品页的导航及 Demo 链接配置，不访问公网服务。

- content/site.mjs：品牌、邮箱、研究描述、产品定位与服务域名。
- content/locales/：三语导航、元信息、正文及联系邮件文案。
- content/experience.mjs：同字段三语能力目录、配对样例、研究资料说明及场景字段。
- scripts/templates.mjs：共用页面模板、导航与页脚。
- assets/wireframe.css：集中视觉角色、布局、控件与响应式规则。
- assets/wireframe.js：样例标签、联系意向与邮件草稿交互。

运行 npm run build 更新十五页静态 HTML。独立输出使用 `node scripts/build.mjs ./dist`。Vercel 配置生成 public 静态目录。

## 联系功能与限制

联系页生成邮件草稿，可打开邮件应用或复制内容。必填联系邮箱、交流意向与简要说明；已有输入、预期结果和验收标准为补充场景字段。任何字段变更会使已有草稿失效。生成草稿不代表发送或送达；页面不会自动发送或保存填表内容。

当前邮箱沿用 panxingyu4869z@gmail.com 与 p1172545066@163.com，实际送达尚未验证。公司主体资料、正式研究结论、开放能力、费用与服务承诺仍以获确认的交付材料为准。

## 本地跨项目预览

正式构建始终保留正式服务域名。若 Console 与 Demo 的隔离本地服务已经运行，可只在预览服务进程配置以下回环地址：

```powershell
$env:CONSOLE_PREVIEW_URL='http://127.0.0.1:8781/'
$env:DEMO_PREVIEW_URL='http://127.0.0.1:8771/'
npm start
```

服务仅改写返回 HTML 的对应链接，保留语言、能力及其他查询参数与片段，不改正文地址或生成文件。配置只接受回环来源，默认不开启。
