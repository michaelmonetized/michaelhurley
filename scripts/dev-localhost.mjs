#!/usr/bin/env node

import { spawnSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

function repoSlugFromCwd(cwd) {
  return path
    .basename(cwd)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function portForSlug(slug) {
  let hash = 0;
  for (const ch of slug) {
    hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  }
  return 3300 + (hash % 5000);
}

function ensureCaddyImport(caddyfilePath) {
  const importLine = "import ~/.local/etc/caddy/dev-sites/*.caddy";
  const marker = "# Project dev sites";
  const existing = existsSync(caddyfilePath) ? readFileSync(caddyfilePath, "utf8") : "";

  if (existing.includes(importLine)) {
    return;
  }

  const suffix = existing.trimEnd().length > 0 ? "\n\n" : "";
  writeFileSync(
    caddyfilePath,
    `${existing.trimEnd()}${suffix}${marker}\n${importLine}\n`,
    "utf8"
  );
}

function writeProjectSnippet(snippetPath, host, port) {
  const content = `${host} {\n\treverse_proxy 127.0.0.1:${port}\n}\n`;
  writeFileSync(snippetPath, content, "utf8");
}

function runChecked(command, args) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const cwd = process.cwd();
const slug = repoSlugFromCwd(cwd);
const host = `${slug}.localhost`;
const port = portForSlug(slug);

const caddyfilePath = path.join(os.homedir(), ".local", "etc", "Caddyfile");
const snippetsDir = path.join(os.homedir(), ".local", "etc", "caddy", "dev-sites");
const snippetPath = path.join(snippetsDir, `${slug}.caddy`);

mkdirSync(snippetsDir, { recursive: true });
ensureCaddyImport(caddyfilePath);
writeProjectSnippet(snippetPath, host, port);

runChecked("caddy", ["reload", "--config", caddyfilePath]);

const url = `https://${host}`;
console.log(`[dev-localhost] ${url} -> 127.0.0.1:${port}`);

const child = spawn(
  path.join(cwd, "node_modules", ".bin", "next"),
  ["dev", "--hostname", "127.0.0.1", "--port", String(port)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      DEV_HOST: host,
      DEV_URL: url,
      PORT: String(port),
    },
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
