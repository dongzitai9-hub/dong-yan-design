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
  { route: "/cases/space-014/", file: "cases/space-014/index.html" },
  { route: "/cases/scheme-001/", file: "cases/scheme-001/index.html" },
];

const requiredFiles = [
  "assets/js/site-data.js",
  "assets/css/navigation.css",
  "assets/css/portfolio.css",
  "nav.js",
  "styles.css",
  "README.md",
  "设计与内容决策.md",
  "网站修改记录.md",
];

const results = [];

const pass = (name) => results.push({ ok: true, name });
const fail = (name, detail) => results.push({ ok: false, name, detail });

const readText = (file) => readFile(path.join(root, file), "utf8");

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

  const data = await readText("assets/js/site-data.js");
  ["/cases/space-015/", "/cases/space-014/", "/cases/space-012/", "/plans/", "/cases/all/"].forEach((needle) => {
    data.includes(needle)
      ? pass(`共享数据包含 ${needle}`)
      : fail(`共享数据缺少 ${needle}`);
  });

  const nav = await readText("nav.js");
  nav.includes("DONGYAN_SITE_DATA")
    ? pass("导航从共享数据读取")
    : fail("导航没有读取共享数据");
  nav.includes("/assets/css/navigation.css")
    ? pass("导航样式已拆到独立 CSS")
    : fail("导航样式未使用独立 CSS");

  const htmlFiles = (await walk(".")).filter((file) => file.endsWith(".html"));
  const navPages = [];
  for (const file of htmlFiles) {
    const text = await readText(file);
    if (!text.includes("/nav.js")) continue;
    navPages.push(file);
    const dataIndex = text.indexOf("/assets/js/site-data.js");
    const navIndex = text.indexOf("/nav.js");
    dataIndex > -1 && dataIndex < navIndex
      ? pass(`${file} 先加载共享数据再加载导航`)
      : fail(`${file} 导航脚本顺序不正确`);
  }
  navPages.length > 0 ? pass(`已检查 ${navPages.length} 个导航页面`) : fail("没有找到导航页面");

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
        }));
        title && metrics.bodyText
          ? pass(`${viewport.label} ${item.route} 页面可渲染`)
          : fail(`${viewport.label} ${item.route} 页面空白`);
        metrics.scrollWidth <= metrics.clientWidth + 1
          ? pass(`${viewport.label} ${item.route} 无横向溢出`)
          : fail(`${viewport.label} ${item.route} 横向溢出`, `${metrics.scrollWidth} > ${metrics.clientWidth}`);
        metrics.navLinks >= 4
          ? pass(`${viewport.label} ${item.route} 全局导航存在`)
          : fail(`${viewport.label} ${item.route} 全局导航异常`, `navLinks=${metrics.navLinks}`);
      }
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
