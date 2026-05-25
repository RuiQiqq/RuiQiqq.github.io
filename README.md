# Rui Qi Portfolio Website

这是 GitHub Pages 作品集网站代码，粉黑/蓝红撞色版本，无金色系。

## 你主要改哪个文件？

只改：

```text
EDIT-ME-content.js
```

这里可以改：

- 名字和定位
- 首页文字
- 项目顺序
- 项目标题/简介/标签
- 是否显示为 Featured
- 视频链接
- 项目详情内容
- 简历链接
- 邮箱 / GitHub / LinkedIn

## 文件说明

```text
index.html                         首页，GitHub Pages 默认入口，不要改名
all-projects.html                  所有项目页
project-detail.html                项目详情页模板
resume-contact.html                简历和联系页
EDIT-ME-content.js                 你主要编辑的内容文件
assets/css/website-look.css        网站视觉样式，粉黑/蓝红配色
assets/js/website-functions.js     网站功能逻辑，尽量别动
assets/images/                     放项目图片
assets/resume/                     放简历 PDF
```

## 怎么上传到 GitHub？

1. 解压 ZIP。
2. 打开你的 `RuiQiqq.github.io` 仓库。
3. 点 `Add file` → `Upload files`。
4. 把解压后的所有文件拖进去。
5. 点 `Commit changes`。
6. 等几十秒，刷新 `https://RuiQiqq.github.io`。

## 怎么改项目顺序？

打开 `EDIT-ME-content.js`，找到某个项目：

```js
order: 1,
```

数字越小越靠前。

## 怎么把项目放到首页 Featured？

```js
featured: true,
```

不想放首页重点展示就改成：

```js
featured: false,
```

## 怎么改标签？

标签库在 `TAGS` 里。
项目里这样写：

```js
tags: ["ue5", "blueprint", "combat", "prototype"]
```

显示出来会自动变成对应标签文字。

## 怎么加视频？

YouTube 示例：

```js
videoEmbed: "https://www.youtube.com/embed/VIDEO_ID",
videoLink: "https://www.youtube.com/watch?v=VIDEO_ID",
```

如果暂时没有视频，可以留空：

```js
videoEmbed: "",
videoLink: "#",
```

## 怎么加封面图？

把图放进：

```text
assets/images/
```

然后项目里写：

```js
coverImage: "assets/images/combat-cover.jpg"
```

## 重要提醒

不要上传：

- 密码
- API key
- 私人地址
- 付费素材源文件
- 整个游戏工程

可以上传：

- 网站代码
- 项目截图
- 简历 PDF
- 项目说明文字
- 公开视频链接
