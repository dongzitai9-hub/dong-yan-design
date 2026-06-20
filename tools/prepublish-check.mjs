import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const render = process.argv.includes("--render");
const requiredRoutes = [
  { route: "/", file: "index.html" },
  { route: "/cases/", file: "cases/index.html" },
  { route: "/plans/", file: "plans/index.html" },
  { route: "/notes/", file: "notes/index.html" },
  { route: "/contact/", file: "contact/index.html" },
  { route: "/cases/space-014/", file: "cases/space-014/index.html" },
  { route: "/cases/scheme-001/", file: "cases/scheme-001/index.html" },
];

const expectedPrimaryNav = [
  { text: "主页", href: "/" },
  { text: "空间", href: "/cases/" },
  { text: "方案", href: "/plans/" },
  { text: "设计札记", href: "/notes/" },
  { text: "咨询", href: "/contact/" },
];

const requiredFiles = [
  "assets/js/site-data.js",
  "assets/css/navigation.css",
  "assets/css/portfolio.css",
  "nav.js",
  "styles.css",
  "README.md",
  "网站资源体积梳理.md",
  "设计与内容决策.md",
  "网站修改记录.md",
  "网站待办清单.md",
];

const results = [];

const pass = (name) => results.push({ ok: true, name });
const fail = (name, detail) => results.push({ ok: false, name, detail });

const readText = (file) => readFile(path.join(root, file), "utf8");

function routeExists(urlString) {
  let pathname;
  try {
    const url = new URL(urlString);
    if (url.hostname !== "dongyandesign.cn") return true;
    pathname = url.pathname;
  } catch {
    pathname = urlString;
  }
  if (!pathname.startsWith("/")) return true;
  const rel = pathname.replace(/^\/+/, "");
  const candidates = pathname.endsWith("/")
    ? [path.join(root, rel, "index.html")]
    : [path.join(root, rel), path.join(root, `${rel}.html`), path.join(root, rel, "index.html")];
  return candidates.some((candidate) => existsSync(candidate));
}

async function walk(dir) {
  const entries = await readdir(path.join(root, dir), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", "node_modules", "drafts"].includes(entry.name)) continue;
      files.push(...(await walk(rel)));
    } else if (entry.isFile()) {
      files.push(rel);
    }
  }
  return files;
}

async function checkStaticStructure() {
  for (const file of requiredFiles) {
    existsSync(path.join(root, file)) ? pass(`存在 ${file}`) : fail(`缺少 ${file}`);
  }

  for (const item of requiredRoutes) {
    existsSync(path.join(root, item.file))
      ? pass(`核心页面存在 ${item.route}`)
      : fail(`核心页面缺失 ${item.route}`, item.file);
  }

  const sitemap = await readText("sitemap.xml");
  const sitemapBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  const malformedSitemapBlocks = sitemapBlocks
    .map((block, index) => ({
      index: index + 1,
      loc: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
      lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
      priority: block.match(/<priority>([^<]+)<\/priority>/)?.[1],
    }))
    .filter((item) => !item.loc || !/^\d{4}-\d{2}-\d{2}$/.test(item.lastmod || "") || !item.priority);
  malformedSitemapBlocks.length === 0
    ? pass("sitemap URL 块结构完整")
    : fail(
        "sitemap URL 块结构异常",
        malformedSitemapBlocks.map((item) => `#${item.index}`).join(", "),
      );
  const sitemapLocs = sitemapBlocks
    .map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1])
    .filter(Boolean);
  const duplicateSitemapLocs = sitemapLocs.filter((loc, index) => sitemapLocs.indexOf(loc) !== index);
  duplicateSitemapLocs.length === 0
    ? pass("sitemap URL 无重复")
    : fail("sitemap URL 存在重复", [...new Set(duplicateSitemapLocs)].join(", "));
  const missingSitemapRoutes = sitemapLocs.filter((loc) => !routeExists(loc));
  missingSitemapRoutes.length === 0
    ? pass("sitemap URL 均有本地页面")
    : fail("sitemap URL 本地页面缺失", missingSitemapRoutes.join(", "));

  const data = await readText("assets/js/site-data.js");
  ["/cases/space-015/", "/cases/space-014/", "/cases/space-012/", "/plans/", "/cases/all/"].forEach((needle) => {
    data.includes(needle)
      ? pass(`共享数据包含 ${needle}`)
      : fail(`共享数据缺少 ${needle}`);
  });
  const primaryNeedles = expectedPrimaryNav.map((item) => `href: "${item.href}", title: "${item.text}"`);
  const primaryIndexes = primaryNeedles.map((needle) => data.indexOf(needle));
  primaryIndexes.every((index) => index > -1) &&
  primaryIndexes.every((index, itemIndex) => itemIndex === 0 || index > primaryIndexes[itemIndex - 1])
    ? pass("共享主导航顺序正确")
    : fail("共享主导航顺序异常", expectedPrimaryNav.map((item) => item.text).join(" > "));

  const nav = await readText("nav.js");
  nav.includes("DONGYAN_SITE_DATA")
    ? pass("导航从共享数据读取")
    : fail("导航没有读取共享数据");
  nav.includes("/assets/css/navigation.css")
    ? pass("导航样式已拆到独立 CSS")
    : fail("导航样式未使用独立 CSS");
  const homeIndex = nav.indexOf('<span>主页</span>');
  const spacesIndex = nav.indexOf('cn: "空间"');
  homeIndex > -1 && spacesIndex > -1 && homeIndex < spacesIndex
    ? pass("导航渲染主页入口在空间左侧")
    : fail("导航渲染主页入口位置异常");

  const htmlFiles = (await walk(".")).filter((file) => file.endsWith(".html"));
  const publishedDraftRefs = [];
  const navPages = [];
  for (const file of htmlFiles) {
    const text = await readText(file);
    if (text.includes("dongyandesign.cn/drafts/") || text.includes('href="/drafts/')) {
      publishedDraftRefs.push(file);
    }
    if (!text.includes("/nav.js")) continue;
    navPages.push(file);
    const dataIndex = text.indexOf("/assets/js/site-data.js");
    const navIndex = text.indexOf("/nav.js");
    dataIndex > -1 && dataIndex < navIndex
      ? pass(`${file} 先加载共享数据再加载导航`)
      : fail(`${file} 导航脚本顺序不正确`);
  }
  navPages.length > 0 ? pass(`已检查 ${navPages.length} 个导航页面`) : fail("没有找到导航页面");
  publishedDraftRefs.length === 0
    ? pass("正式 HTML 页面无草稿路径引用")
    : fail("正式 HTML 页面仍引用草稿路径", publishedDraftRefs.join(", "));

  const stickyPages = [];
  for (const file of htmlFiles.filter((file) => file.startsWith("cases/"))) {
    const text = await readText(file);
    if (!text.includes("data-sticky-story")) continue;
    stickyPages.push(file);
    text.includes("overflow-x: visible")
      ? pass(`${file} 保留 sticky 需要的 body overflow 可见规则`)
      : fail(`${file} 可能破坏 sticky overflow`, "缺少 overflow-x: visible");
  }
  stickyPages.length > 0 ? pass(`已检查 ${stickyPages.length} 个固定滚动详情页`) : fail("没有找到固定滚动详情页");
}

function contentType(file) {
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

async function serveStatic() {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    let rel = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    if (!rel || rel.endsWith("/")) rel = path.join(rel, "index.html");
    const file = path.join(root, rel);
    try {
      const info = await stat(file);
      if (!info.isFile()) throw new Error("not file");
      res.writeHead(200, { "content-type": contentType(file) });
      res.end(await readFile(file));
    } catch {
      res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      res.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return server;
}

async function checkRendered() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    fail("渲染检查未运行", "本机未安装 Playwright，先运行 npm install");
    return;
  }

  const server = await serveStatic();
  const port = server.address().port;
  const base = `http://127.0.0.1:${port}`;
  const browser = await chromium.launch();

  try {
    for (const viewport of [
      { width: 1440, height: 1000, label: "desktop" },
      { width: 390, height: 844, label: "mobile-390" },
    ]) {
      const page = await browser.newPage({ viewport });
      const errors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") errors.push(msg.text());
      });

      for (const item of requiredRoutes) {
        await page.goto(`${base}${item.route}`, { waitUntil: "networkidle" });
        const title = await page.title();
        const metrics = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          bodyText: document.body.innerText.slice(0, 120),
          navLinks: document.querySelectorAll(".global-site-header .site-nav a").length,
          primaryNav: (() => {
            const navRoot = document.querySelector(".global-site-header .site-nav");
            if (!navRoot) return [];
            return [...navRoot.children].slice(0, 5).map((child) => {
              const link = child.matches("a") ? child : child.querySelector(":scope > a");
              return {
                text: link?.querySelector("span")?.textContent?.trim() || "",
                href: link?.getAttribute("href") || "",
              };
            });
          })(),
        }));
        const navMatches = expectedPrimaryNav.every(
          (expected, index) =>
            metrics.primaryNav[index]?.text === expected.text &&
            metrics.primaryNav[index]?.href === expected.href,
        );
        title && metrics.bodyText
          ? pass(`${viewport.label} ${item.route} 页面可渲染`)
          : fail(`${viewport.label} ${item.route} 页面空白`);
        metrics.scrollWidth <= metrics.clientWidth + 1
          ? pass(`${viewport.label} ${item.route} 无横向溢出`)
          : fail(`${viewport.label} ${item.route} 横向溢出`, `${metrics.scrollWidth} > ${metrics.clientWidth}`);
        metrics.navLinks >= 4
          ? pass(`${viewport.label} ${item.route} 全局导航存在`)
          : fail(`${viewport.label} ${item.route} 全局导航异常`, `navLinks=${metrics.navLinks}`);
        navMatches
          ? pass(`${viewport.label} ${item.route} 主导航顺序正确`)
          : fail(
              `${viewport.label} ${item.route} 主导航顺序异常`,
              metrics.primaryNav.map((item) => `${item.text}:${item.href}`).join(" | "),
            );
      }
      await page.goto(`${base}/contact/`, { waitUntil: "networkidle" });
      await Promise.all([
        page.waitForURL(`${base}/`, { waitUntil: "networkidle" }),
        page.locator('.global-site-header .site-nav > a[href="/"]').click(),
      ]);
      page.url() === `${base}/`
        ? pass(`${viewport.label} 主页入口点击返回首页`)
        : fail(`${viewport.label} 主页入口点击异常`, page.url());
      await page.close();

      errors.length === 0
        ? pass(`${viewport.label} 控制台无错误`)
        : fail(`${viewport.label} 控制台错误`, errors.slice(0, 5).join(" | "));
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

await checkStaticStructure();
if (render) await checkRendered();

const failed = results.filter((item) => !item.ok);
for (const item of results) {
  console.log(`${item.ok ? "PASS" : "FAIL"} ${item.name}${item.detail ? ` - ${item.detail}` : ""}`);
}

if (failed.length) {
  console.error(`\n${failed.length} checks failed.`);
  process.exit(1);
}

console.log(`\nAll ${results.length} checks passed.`);
