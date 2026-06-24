#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.INDEXNOW_HOST || "dongyandesign.cn";
const endpoint = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

function readArg(flag) {
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findIndexNowKeyFile() {
  const explicitFile = process.env.INDEXNOW_KEY_FILE || readArg("--key-file");
  if (explicitFile) {
    const resolved = path.resolve(repoRoot, explicitFile);
    const key = (await fs.readFile(resolved, "utf8")).trim();
    return { key, keyFileName: path.basename(resolved) };
  }

  if (process.env.INDEXNOW_KEY) {
    const key = process.env.INDEXNOW_KEY.trim();
    return { key, keyFileName: `${key}.txt` };
  }

  const entries = await fs.readdir(repoRoot);
  for (const entry of entries) {
    if (!/^[a-z0-9-]{8,128}\.txt$/i.test(entry)) continue;
    const fullPath = path.join(repoRoot, entry);
    const key = (await fs.readFile(fullPath, "utf8")).trim();
    if (`${key}.txt` === entry) return { key, keyFileName: entry };
  }

  throw new Error("No IndexNow key file found in the site root.");
}

async function readUrlList() {
  const directUrls = args.filter((arg) => /^https?:\/\//.test(arg));
  if (directUrls.length) return directUrls;

  const urlFile = readArg("--file") || "urls.txt";
  const urlFilePath = path.resolve(repoRoot, urlFile);
  const raw = await fs.readFile(urlFilePath, "utf8");
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function normalizeUrlList(urls) {
  const uniqueUrls = [...new Set(urls)];
  const invalidUrls = uniqueUrls.filter((url) => {
    try {
      return new URL(url).hostname !== host;
    } catch {
      return true;
    }
  });

  if (invalidUrls.length) {
    throw new Error(`URL list contains invalid or off-host URLs:\n${invalidUrls.join("\n")}`);
  }

  return uniqueUrls;
}

const { key, keyFileName } = await findIndexNowKeyFile();
const keyFilePath = path.join(repoRoot, keyFileName);
if (!(await fileExists(keyFilePath)) && !process.env.INDEXNOW_KEY) {
  throw new Error(`IndexNow key file does not exist: ${keyFileName}`);
}

const urlList = normalizeUrlList(await readUrlList());
const payload = {
  host,
  key,
  keyLocation: `https://${host}/${keyFileName}`,
  urlList,
};

if (dryRun) {
  console.log(`IndexNow dry run: ${urlList.length} URL(s), key file ${keyFileName}`);
  process.exit(0);
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

const responseText = await response.text();
if (!response.ok) {
  console.error(`IndexNow submit failed: HTTP ${response.status}`);
  if (responseText) console.error(responseText.slice(0, 1000));
  process.exit(1);
}

console.log(`IndexNow accepted ${urlList.length} URL(s): HTTP ${response.status}`);
