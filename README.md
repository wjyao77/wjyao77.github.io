# alucard / wjy77 — 个人研究名片

纸张质感与大块面几何拼贴组成的静态个人主页。姓名、简介、研究方向和联系方式均保留待填写状态。包含移动端适配、中文字体、浏览器内编辑预览与 JSON 配置下载。

## GitHub Pages

目标仓库：`wjyao77/wjyao77.github.io`。

网站地址：`https://wjyao77.github.io/`。发布状态可在仓库的 Actions 和 Settings → Pages 中查看。

将本目录中的文件放在仓库根目录，确保 `index.html` 位于根目录。在仓库 **Settings → Pages** 中选择 **Deploy from a branch → main → /(root)** 并保存。`.nojekyll` 用于直接发布静态文件。

本项目无需 npm、构建命令、服务器、密钥或第三方字体服务。插画、字体与纹理均在仓库内。字体许可见 `fonts/OFL.txt`。

## 更新个人内容

编辑根目录的 `content.json` 并提交，GitHub Pages 会按配置重新发布。

| 字段 | 内容 |
| --- | --- |
| `name` | 姓名 |
| `role` | 身份 / 研究领域 |
| `bio` | 个人简介，可包含换行 |
| `interests` | 研究方向字符串数组，最多 6 项 |
| `email` | 展示的联系邮箱 |
| `linkLabel` | 个人链接名称 |
| `linkUrl` | 以 `https://` 或 `http://` 开头的地址 |

网站页脚的「编辑内容」只保存当前浏览器的本地预览。下载配置后，将下载的 `content.json` 替换到仓库并提交，才会更新所有访问者看到的默认内容。本地预览不会跨域迁移；在原站点自行填写过的内容需要先下载配置。

## 本地预览

在本目录运行：

```sh
python -m http.server 8080
```

然后打开 `http://localhost:8080/`。

## 官方文档

- [创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [配置发布来源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
