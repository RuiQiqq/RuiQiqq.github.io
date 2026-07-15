# Rui Qi Bilingual Portfolio

This version supports English and Simplified Chinese on the same website.

## Edit only these two files

- `EDIT-ME-English.js` — English text, English resume, YouTube links
- `EDIT-ME-Chinese.js` — Chinese text, Chinese resume, Bilibili links

The language switch appears in the top navigation. The website remembers the selected language and also adds `?lang=en` or `?lang=zh` to shareable URLs.

## Required resume filenames

- English: `assets/resume/Rui_Qi_Resume_EN.pdf`
- Chinese: `assets/resume/Rui_Qi_Resume_ZH.pdf`

## Video links

You can normally paste only the public video URL into `videoLink` and leave `videoEmbed` empty.

- English YouTube: `https://www.youtube.com/watch?v=VIDEO_ID`
- Chinese Bilibili: `https://www.bilibili.com/video/BVxxxxxxxxxx`

The website automatically creates the embedded player. Use a full Bilibili BV link rather than a `b23.tv` short link.

## Adding a project

Copy one complete project object into both language files. Keep the same `id` in English and Chinese, then translate the visible text and use the appropriate platform-specific links.

See `中文修改指南.md` for detailed instructions.
