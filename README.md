# 网页总指挥

这个目录是董揅设计官网的正式维护目录。以后默认只让 Codex 打开和修改这里：

`/Users/apple/Documents/做一个网页设计`

原始完整备份在：

`/Users/apple/Documents/做一个网页设计-旧项目备份`

素材库在：

`/Users/apple/Documents/做一个网页设计-素材库`

素材库只在需要图片、文案、参考资料、原始大图、PPT 或临时输出时单独指定读取，不作为默认扫描范围。

## 项目结构

- `index.html`：首页。
- `styles.css`：全站主要样式。
- `script.js`：全站主要交互和案例图片数据。
- `nav.js`：统一导航生成、下拉、滚动显示隐藏等导航交互。
- `assets/js/site-data.js`：全站导航和入口共享数据。
- `assets/css/navigation.css`：统一导航样式。
- `assets/css/portfolio.css`：空间/方案索引页的局部样式入口。
- `assets/optimized/editorial/`：首页关键视觉图的本地高质量 WebP 优化版。
- `assets/optimized/portfolio-covers/`：空间索引和首页服务入口可复用的本地封面 WebP 优化版。
- `tools/prepublish-check.mjs`：正式发布前固定检查脚本。
- `package.json`、`package-lock.json`：本地检查和 Playwright 验证依赖。
- `AGENTS.md`：给后续维护者和 Codex 的仓库协作规则。
- `about/`：关于页面。
- `cases/`：案例列表与案例详情页。
- `plans/`：方案辑选与方案案例入口。
- `services/`：服务页面。
- `faq/`：常见问题页面。
- `notes/`：设计笔记文章。
- `assets/`：网站上线和维护需要的图片、字体、标识等资源。
- `CNAME`：自定义域名配置。
- `robots.txt`：搜索引擎抓取规则。
- `sitemap.xml`：站点地图。
- `urls.txt`：URL 清单。
- `baidu-api-urls.txt`：百度推送 URL 清单。
- `baidu_verify_codeva-oe5n348cMN.html`：百度站点验证文件。
- `googlee310e40028617b8f.html`：Google 站点验证文件。
- `dongyandesign.cn.zone`：域名 DNS 记录备份。
- `deploy/`：服务器配置备份，不作为网页内容上传到站点目录。
- `.nojekyll`：GitHub Pages 静态站点辅助文件。

## 文件分工

- `README.md`：网页总指挥，负责项目结构、维护方式、Codex 操作规则。
- `董揅设计官网最新说明.md`：品牌定位、网站内容、设计方向、页面规划。
- `GEO生成式引擎优化长期指令.md`：长期 SEO/GEO/AI 搜索收录优化原则。
- `seo-meta-and-alt.md`：页面 meta、title、description、canonical、图片 alt 的具体执行清单。
- `网站资源体积梳理.md`：记录当前资源体积、引用扫描、可迁出候选和 backup 远端整理状态。
- `网站修改记录.md`：记录每次已经修改了什么。
- `网站待办清单.md`：记录后续还要优化什么。
- `设计与内容决策.md`：记录已经确定的重要设计和内容规则，避免以后反复改错。

## 修改前先看什么

常规页面、样式、交互修改：

1. 先读 `README.md`。
2. 再读 `董揅设计官网最新说明.md` 中和当前页面相关的部分。
3. 修改完成后更新 `网站修改记录.md`。
4. 如产生后续事项，更新 `网站待办清单.md`。
5. 如形成长期规则，更新 `设计与内容决策.md`。

SEO/GEO 相关修改：

1. 先读 `README.md`。
2. 再读 `GEO生成式引擎优化长期指令.md`。
3. 只有在修改 title、meta description、canonical、图片 alt、新增案例页、新增 notes 文章、更新 sitemap、做 SEO/GEO 优化时，才读取 `seo-meta-and-alt.md`。

## 哪些文件可以改

可以按任务修改：

- `index.html`
- `styles.css`
- `script.js`
- `about/`
- `cases/`
- `services/`
- `faq/`
- `notes/`
- `assets/`
- `sitemap.xml`
- `urls.txt`
- `baidu-api-urls.txt`
- `robots.txt`
- `README.md`
- `网站资源体积梳理.md`
- `网站修改记录.md`
- `网站待办清单.md`
- `设计与内容决策.md`

修改 `sitemap.xml`、`robots.txt`、页面 title、meta description、canonical、图片 alt 前，必须确认是否影响百度和 Google 已收录内容。

## 哪些目录不要默认扫描

不要默认扫描：

- `/Users/apple/Documents/做一个网页设计-素材库`
- `/Users/apple/Documents/做一个网页设计-旧项目备份`
- `tmp/`
- `output/`
- `drafts/`
- `wenanziliao/`

如果这些资料被用户明确指定，才按指定路径读取。

## 搜索收录保护规则

- 不改变已上线页面 URL 路径。
- 不删除 `index.html`、`about/`、`cases/`、`services/`、`faq/`、`notes/` 等已上线页面。
- 不随意修改 title、meta description、canonical、robots、sitemap。
- 不删除 `sitemap.xml`、`robots.txt`、`CNAME`、百度验证文件、Google 验证文件。
- 不删除网页正在引用的图片、字体、脚本和样式。
- 如果移动 `assets` 中的图片，必须同步修改 HTML/CSS/JS 中的引用路径，并检查页面能正常加载。
- 如果不确定某个页面、图片、字体或文件是否已被收录或正在使用，先保留，不删除。
- 不为了精简项目而删除已经上线过的内容页。
- 如需移除旧页面，必须先说明原因，并建议做 301 跳转或保留原路径。

## 轻量维护规则

- 当前网站目录只放上线和维护网站需要的内容。
- 素材、草稿、AI 生成图、原始大图、PPT、压缩包放到素材库。
- 新增图片或视频后，默认先上传到阿里云 OSS，并在 HTML/CSS/JS 中引用 OSS 地址；本地只保留必要维护备份。
- 本机已有 OSS 配置文件 `~/.ossutilconfig`；如命令行没有 `ossutil`，可用 Python `oss2` 读取该配置上传到 `dongyan-design` bucket，不要在终端输出密钥。
- 新增页面、脚本、样式后，检查是否产生临时文件、重复文件、无用备份。
- 不确定是否需要的文件不要删除，先保留到当前网站目录或素材库。
- 每次修改网站后，更新 `网站修改记录.md`。
- 有待处理事项时，更新 `网站待办清单.md`。
- 有长期品牌、设计、内容、SEO 决策时，更新 `设计与内容决策.md`。

## 结构维护规则

- 导航内容优先改 `assets/js/site-data.js`，不要再逐页手改导航下拉。
- 顶部主导航固定顺序为：主页、空间、方案、设计札记、咨询；主页入口由 `nav.js` 统一渲染，点击返回 `/`。
- 导航样式优先改 `assets/css/navigation.css`，不要先动 `styles.css` 里的全站样式。
- 页面 HTML 里不要复制旧导航结构，只保留 `<header class="site-header" aria-label="站点导航"></header>`，由 `nav.js` 统一生成导航。
- 空间/方案索引页的局部样式优先改 `assets/css/portfolio.css`。
- 方案详情页 `/cases/scheme-001/` 至 `/cases/scheme-006/` 已统一为四段式模板：首屏、第二屏标语、粘性三图推演、结尾四图轮播。
- 方案详情页共用样式放在 `assets/css/scheme-detail.css`，共用交互放在 `assets/js/scheme-detail.js`；不要再把同一套方案详情 CSS/JS 内嵌到每个方案页。
- 方案页的网页展示图统一优先使用 `/assets/optimized/schemes-detail/*/cinema/` 下的 2400×1350 WebP 扩底色版本；原始方案图保留，不直接覆盖。
- 普通案例/空间详情页的共用交互脚本放在 `assets/js/case-detail.js`，共用样式放在 `assets/css/case-detail*.css`；不要再把大段详情页 CSS/JS 重新内嵌到每个页面。
- 首页关键图、空间索引封面和会影响入口速度的静态图，可以使用 `/assets/optimized/` 下的本地高质量 WebP；大尺寸详情页原图和新增普通媒体仍优先走 OSS。
- 首页底部视频默认延后加载，不参与首屏抢加载；除非重做首页交互，不要恢复成首屏预加载。
- 所有接入 `nav.js` 的页面需要在 head 中直接加载 `assets/css/navigation.css`，并保留 OSS `preconnect`，减少导航样式和外部图片的等待时间。
- `styles.css` 仍是历史全站样式文件，后续只在确认影响范围后再继续拆分。
- 改 `nav.js`、`assets/js/site-data.js`、`styles.css`、案例详情页 sticky 模块前，必须先跑发布检查。

## 发布前固定检查

正式发布前至少执行：

```bash
npm run check:prepublish
npm run check:prepublish:render
```

检查范围固定包含：首页、`/cases/`、`/plans/`、`/notes/`、`/contact/`、一个空间详情页、一个方案详情页，以及 390px 手机端横向溢出检查。

检查脚本还会验证顶部主导航顺序为“主页、空间、方案、设计札记、咨询”，并在桌面和 390px 手机端测试“主页”入口能返回首页。

检查脚本还会拦截正式 HTML 中残留的 `/drafts/` 草稿路径，避免旧草稿链接或结构化数据混入正式站点。

检查脚本同时会检查 `sitemap.xml` 的 URL 块是否完整、是否有重复 URL、是否都能对应到本地正式页面。

## 阿里云服务器部署

- 阿里云轻量应用服务器公网 IP：`47.103.223.113`。
- 服务器系统：Ubuntu 22.04。
- 本地 SSH 别名：`aliyun-dongyan`。
- 本地私钥：`~/.ssh/codex_aliyun_dongyan`。
- 服务器网站目录：`/var/www/dongyandesign`。
- Web 服务：Nginx。
- 当前可用 IP 测试地址：`http://47.103.223.113`。

本地改完网站后，同步到阿里云服务器：

```bash
rsync -az --no-owner --no-group --delete --exclude='.git' --exclude='.DS_Store' --exclude='deploy' "/Users/apple/Documents/做一个网页设计/" aliyun-dongyan:/var/www/dongyandesign/
```

同步后检查：

```bash
curl -I http://47.103.223.113
ssh aliyun-dongyan 'nginx -t && systemctl is-active nginx'
```

备案通过前，`dongyandesign.cn` 继续保持 GitHub Pages 访问，不切换到阿里云 IP。备案通过后，再将域名 A 记录解析到 `47.103.223.113`，并配置 HTTPS。

服务器 Nginx 配置备份在 `deploy/nginx-dongyandesign.conf`。该配置让 IP 访问返回 `X-Robots-Tag: noindex, nofollow, noarchive`，并让 IP 下的 `/robots.txt` 返回 `Disallow: /`，避免备案测试 IP 被搜索引擎收录。

## 常用维护指令

如果用户说“更新三份维护文档”，默认指：

- 更新 `README.md`：项目结构、维护方式、部署方式、操作规则。
- 更新 `网站修改记录.md`：记录本次改动、影响范围、验证结果。
- 更新 `设计与内容决策.md`：记录长期有效的设计、内容、部署或维护决策。

如果用户说“按官网维护流程处理”，默认执行：

1. 修改网站。
2. 更新三份维护文档。
3. 检查本地或线上效果。
4. 如用户要求部署，则同步到阿里云服务器。

## Git 规则

这个网站目录没有带入旧项目的 `.git` 大历史，已经重新初始化为干净的 Git 仓库。

正式域名当前通过 GitHub Pages 仓库发布：

```text
https://github.com/dongzitai9-hub/dong-yan-design
```

正式发布固定流程：

1. 完整克隆正式仓库，不使用浅克隆。
2. 只带入本次明确修改的文件，不从本地脏目录直接推送。
3. 用 `git diff --stat` 和关键 diff 确认没有无关改动。
4. 执行 `npm run check:prepublish` 和 `npm run check:prepublish:render`。
5. 提交并推送 `main`。
6. 线上用 `https://dongyandesign.cn/` 实际复查。

每次正式发布后必须更新：

1. `README.md`
2. `设计与内容决策.md`
3. `网站修改记录.md`

## 首页 Hero 性能规则

- 全站后续新增或重做页面，页面主背景优先使用浅灰白 `#F2F3F4`，不要使用纯白大底；图片或局部卡片可用更浅的灰白作轻微区分。
- 首页首屏第一张 Hero 图必须直接写在 `index.html`，并保留 `preload` 和 `fetchpriority="high"`。
- 首页 Hero 前两张图必须直接写在 `index.html`：第一张高优先级，第二张低优先级提前准备，保留约 1.8 秒切换。
- 首页 Hero 首屏前两张优先使用轻量 WebP，不直接强拉接近 1MB 的原始大图。
- 首页 Hero 轮播计时不能挂在 `window.load` 或 `requestIdleCallback` 后面；手机端网络慢时会被后段图片和媒体拖慢。
- 首页刚打开时只准备前两张 Hero 图；第 3 张以后延后补入，避免手机浏览器顶部加载进度条被后续轮播图拖长。
- 空间索引封面按“电脑高清、手机轻量”处理：电脑端使用 `/assets/optimized/portfolio-covers/`，手机端使用 `/assets/optimized/portfolio-covers-mobile/`。
- 空间和普通案例详情页图片按“电脑高清、手机轻量”处理：电脑端使用 OSS 原高清图，手机端使用 OSS `assets/optimized/detail-mobile/` 轻量图；详情页前段 5 张可提前加载，后段轮播和结尾图继续懒加载。
- 空间和普通案例详情页不能在打开时一次性写入整页真实图片地址；`assets/js/case-detail.js` 只立即加载首图，其他图片接近视口或轮播需要时再按电脑/手机选择对应图片。
- 后续新增案例时，用户只需说明“新案例按电脑高清、手机轻量两套图处理；电脑端看高清原图，手机端用压缩轻量图，不能互相混用”。
- 首页可在空闲时预取 `/cases/`；空间索引页和方案索引页的后台预取只在电脑端启用，手机端不做自动预取，避免进入页面后顶部加载进度条长时间不结束。
- 咨询页首屏参考图也按电脑高清、手机轻量处理；手机端本地轻量图放在 `/assets/optimized/contact-mobile/`。
- 方案详情页只有 4 张方案图，手机端轻量图要直接写在页面 `src` 中并立即预热 4 张图；电脑端再通过 `data-scheme-desktop-src` 使用 `/cinema/` 高清图。
- 设计札记图文页按“电脑清晰 WebP、手机轻量 WebP”处理；不要在正式页面直接引用 1MB 以上 PNG 作为正文大图。札记默认采用“首屏标题、观点说明、单张重点图、图文解释、对比/尺寸模块、小结”，不默认加结尾轮播。
- 札记文章如果用户要求“打开就顺”，首屏优先文字标题和观点，不默认把大图压在首屏；第一张重点图放在观点后，并使用电脑/手机 WebP 分流。
- 札记文章重排时优先保留原文章内容逻辑，再调整满屏排版和图片节奏；不要为了视觉效果删掉文章的起承转合。
- 札记正文图片后期可迁到 OSS；迁移前必须确认 OSS 地址可访问，迁移时只替换图片地址，不改变文章结构和统一导航。
- 修改首页 Hero 后必须同步更新 `script.js` 的缓存版本号。
