V18 系统拆解 UI 增量补丁

建议使用这个补丁，而不是完整网站包，因为它不会覆盖 Pages CMS 里你最近保存的 content/*.json。

把本文件夹中的文件按原目录覆盖到 GitHub 仓库根目录：
- assets/css/website-look.css
- assets/js/website-functions.js
- assets/js/content-loader.js
- index.html
- all-projects.html
- project-detail.html
- resume-contact.html
- resume-viewer.html

不要删除或覆盖 content/ 文件夹。

本版变化：
1. 系统拆解由 4 列改为 2 列。
2. 有图项显示大图，按图片原始比例完整展示，不再强制 16:9。
3. 无图项自动变成紧凑文本卡，不再留一大块空白图片区。
4. 点击系统图片可在当前网页全屏放大查看，Esc 或点击背景关闭。
5. 手机端自动变为 1 列。
