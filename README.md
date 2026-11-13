# AWS SAP-C02 Practice

AWS Certified Solutions Architect – Professional（SAP-C02）中文刷题与考前复习网站，包含 529 道练习题。

**碎片时间先学：[5 / 10 / 15 分钟学习路线](https://lajidonggua.github.io/aws-sap-c02-practice/path/)** · **[打开刷题网站](https://lajidonggua.github.io/aws-sap-c02-practice/)**

## 功能

- 短时学习：8 阶段、24 张知识卡，先理解职责和适用条件，回想后对照参考答案与核对点，再做场景小测，带走一句知识总结。
- 完成本节默认安排次日巩固；已熟悉的内容可选择按 1 / 3 / 7 / 14 天拉开间隔。保存当前卡、作答状态与学习时长，登录后跨设备继续。完成记录表示一轮学习，不等于掌握认证。

- 刷题前知识手册：13 个循序渐进的主题、核心名词与用法、易混对比、场景小测、已读进度和关联练习。

- 章节和名词可进入对应题目集合，前后翻题、随机、闪记、错题和收藏都保留当前范围。
- 详细复习手册：11 章、4 大考试域、服务对比、易错陷阱和 18 道原创场景题。
- 学习进度页：阅读位置、小测答案、刷题与章节进度、备份导出和合并恢复。
- 账号与云同步：Cloudflare Workers + D1；访客和各账号分别保存，支持断网后继续同步。
- 顺序刷题、随机练习、错题重练和收藏。
- 独立作答时默认隐藏提示；可主动展开，也保留闪记和速查模式。
- 关键词支持检索中英文题干、全部选项和速记内容，精确题号优先。
- 每题小白解析：题目条件、知识点、相关名词解释、生活类比、架构图和理解自测。
- 多选题专项练习、计时模拟考、争议题提示和术语表。
- 自动在当前浏览器保存练习进度、错题和收藏。

这是一个纯 HTML、CSS、JavaScript 网站，无需安装依赖、构建或运行后端服务。访客记录保存在浏览器中。配置并启用 Cloudflare 账号服务后，登录用户可以跨设备同步学习进度；未配置时，页面会说明当前仅使用本机保存。

## 本地预览

在项目目录中运行：

```sh
python3 -m http.server 8000
```

然后打开 <http://localhost:8000>。

## GitHub Pages

仓库包含自动发布配置。将仓库 **Settings → Pages → Source** 设置为 **GitHub Actions** 后，每次推送到 `main` 分支都会发布网站。

发布内容仅包含网页及其所需资源；本地备份、原始 PDF 和开发辅助文件不会包含在网站发布包中。

## Cloudflare Pages

也可以连接此仓库部署到 Cloudflare Pages：框架选择 `None`，无需构建，输出目录使用仓库根目录。或者将网页和所需的 JavaScript、CSS 文件及子页面目录直接上传。

## 文件说明

| 路径 | 用途 |
| --- | --- |
| `index.html` | 学习入口与刷题首页 |
| `path/` | 短时学习、回想与复习提醒 |
| `learning_path_data.js` | 24 张原创知识卡与精选题目关联 |
| `learning_path_model.js` | 复习间隔与任务推荐 |
| `review/` | 按考试域组织的详细复习手册 |
| `account/` | 账号、学习进度与备份 |
| `backend/` | Cloudflare Workers + D1 账号服务 |
| `choice/` | 原版题库 |
| `multi/` | 多选题专项练习 |
| `exam/` | 计时模拟考 |
| `disputed/` | 争议题专区 |
| `glossary/` | 术语表 |
| `sap_questions.js` | 题目数据 |
| `sap_explanations.js` | 题目解析 |
| `quick_answer_cards.js`、`flash_cards.js` | 速记卡与闪记数据 |

架构图使用随网站一起发布的 Mermaid 绘制，不依赖第三方 CDN。术语卡片可以直接跳转到相关术语；存疑题会明确提示争议，避免把有冲突的旧解析当作定论。

## 维护速记卡

已有速记卡可直接用于网站。需要重新生成时，在安装 Node.js 的环境中运行：

```sh
node build_quick_cards.cjs
node test_quick_cards.cjs
node test_quick_search.cjs
node test_learning_review.cjs
node test_study_guide.cjs
node test_practice_sets.cjs
node test_progress_store.cjs
node test_path_progress.cjs
node test_account_sync.cjs
node test_learning_path_model.cjs
node test_learning_path_content.cjs
```

浏览器回归检查需另外安装 Playwright 及其 Chromium，并先启动本地预览，然后运行：

```sh
SAP_TEST_BASE=http://127.0.0.1:8000/ node test_practice_navigation.cjs
SAP_TEST_BASE=http://127.0.0.1:8000/ node test_short_practice_navigation.cjs
SAP_TEST_BASE=http://127.0.0.1:8000/ node test_learning_path_browser.cjs
```

账号服务配置和验证见 [backend/README.md](backend/README.md)。本地服务启动后，可运行 `node test_account_api.mjs`，以及安装 Playwright 后运行 `node test_learning_profiles.cjs`，验证真实登录、账号隔离、两个浏览器同步和断网恢复。

练习题与解析用于学习参考；争议题以网站提示为准。

短课进度使用独立的本机存储分区，并通过 `schema: 2` 同步；旧客户端只收到它认识的记录。升级时先部署账号后端，再发布前端，避免旧页面拒绝新增记录。备份读取兼容版本 1/2。
