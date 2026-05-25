# Rui Qi Technical Designer Portfolio

这是给 GitHub Pages 用的静态作品集网站。

## 你最应该记住的 3 个地方

1. `EDIT-ME-content.js`  
   这是你主要修改的内容文件。改名字、首页文字、项目、标签、顺序、视频链接、联系方式，都在这里。

2. `assets/images/`  
   这里放项目封面图、截图、GIF 缩略图等。

3. `assets/resume/`  
   这里放你的简历 PDF。建议文件名：`Rui_Qi_Resume.pdf`。

## 这些文件分别是什么

- `index.html`：首页。GitHub Pages 必须用这个名字，不要改。
- `all-projects.html`：所有项目页面。
- `project-detail.html`：项目详情页模板。所有项目共用它。
- `about-contact.html`：关于我、简历、联系方式页面。
- `EDIT-ME-content.js`：你主要编辑的内容文件。
- `assets/css/website-look.css`：网站外观样式，不懂代码就不要动。
- `assets/js/website-functions.js`：网站功能逻辑，不懂代码就不要动。

## 上传到 GitHub

把这个文件夹里的所有内容上传到你的 `RuiQiqq.github.io` 仓库。
注意：上传解压后的文件，不是上传 ZIP 本身。

## 修改项目

打开 `EDIT-ME-content.js`，找到 `PROJECTS` 区域。

常见修改：

- `order`：项目顺序，数字越小越靠前。
- `featured`：是否放首页精选，`true` 是放，`false` 是不放。
- `title`：项目标题。
- `summary`：项目卡片简介。
- `tags`：项目标签。
- `coverImage`：封面图路径，比如 `assets/images/combat-cover.jpg`。
- `videoEmbed`：嵌入式视频链接，比如 YouTube embed 链接。
- `videoLink`：普通视频观看链接。

## 项目详情页链接

所有项目都使用同一个详情页：

`project-detail.html?id=combat-system`

其中 `combat-system` 来自 `EDIT-ME-content.js` 里项目的 `id`。

## 简历

把你的简历 PDF 放到：

`assets/resume/Rui_Qi_Resume.pdf`

如果你改了文件名，就去 `EDIT-ME-content.js` 里修改 `SITE.resume`。

## 视频建议

不要把大视频直接上传 GitHub。推荐：

- YouTube
- Vimeo
- Bilibili

然后把链接填进 `EDIT-ME-content.js`。
