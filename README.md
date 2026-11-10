# AWS SAP-C02 Practice

AWS Certified Solutions Architect – Professional（SAP-C02）中文刷题与考前复习网站，包含 529 道练习题。

**在线练习：[打开刷题网站](https://lajidonggua.github.io/aws-sap-c02-practice/)**

## 功能

- 顺序刷题、随机练习、错题重练和收藏。
- 5 秒闪记、题眼提示、答案关键词和速记卡。
- 每题小白解析：题目条件、知识点、相关名词解释、生活类比、架构图和理解自测。
- 多选题专项练习、计时模拟考、争议题提示和术语表。
- 自动在当前浏览器保存练习进度、错题和收藏。

这是一个纯 HTML、CSS、JavaScript 网站，无需安装依赖、构建或运行后端服务。练习记录保存在浏览器中，不会自动跨设备同步。

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
| `index.html` | 刷题与闪记首页 |
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
node test_learning_review.cjs
```

练习题与解析用于学习参考；争议题以网站提示为准。
