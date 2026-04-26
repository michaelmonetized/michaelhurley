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

function ensureCaddyImport(caddyfilePath, snippetsDir) {
  const importLine = `import ${path.join(snippetsDir, "*.caddy")}`;
  const legacyImportLine = "import ~/.local/etc/caddy/dev-sites/*.caddy";
  const marker = "# Project dev sites";
  const existing = existsSync(caddyfilePath) ? readFileSync(caddyfilePath, "utf8") : "";
  const replacedLegacy = existing.replaceAll(legacyImportLine, importLine);

  if (replacedLegacy.includes(importLine)) {
    if (replacedLegacy !== existing) {
      writeFileSync(caddyfilePath, replacedLegacy, "utf8");
    }
    return;
  }

  const suffix = replacedLegacy.trimEnd().length > 0 ? "\n\n" : "";
  writeFileSync(
    caddyfilePath,
    `${replacedLegacy.trimEnd()}${suffix}${marker}\n${importLine}\n`,
    "utf8"
  );
}

function writeProjectSnippet(snippetPath, host, port) {
  const content = `${host} {\n\treverse_proxy 127.0.0.1:${port}\n}\n`;
  writeFileSync(snippetPath, content, "utf8");
}

function printCommandResult(result) {
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
}

function runCommand(command, args, options = {}) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: options.stdio,
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function caddyAdminUnavailable(result) {
  const output = `${result.stdout ?? ""}\n${result.stderr ?? ""}`;

  return (
    output.includes("connect: connection refused") &&
    (/[:[]2019(?:\]|\/|:).*\/load/.test(output) || output.includes(":2019"))
  );
}

function ensureCaddyLoaded(caddyfilePath) {
  const reload = runCommand("caddy", [
    "reload",
    "--config",
    caddyfilePath,
    "--address",
    "127.0.0.1:2019",
  ]);
  printCommandResult(reload);

  if (reload.status === 0) {
    return;
  }

  if (!caddyAdminUnavailable(reload)) {
    process.exit(reload.status ?? 1);
  }

  console.warn(
    "[dev-localhost] Caddy is not running. Starting it now. You may be prompted once for your password so Caddy can finish local HTTPS setup."
  );

  const start = runCommand("caddy", ["start", "--config", caddyfilePath], {
    stdio: "inherit",
  });

  if (start.status !== 0) {
    process.exit(start.status ?? 1);
  }
}

const cwd = process.cwd();
const slug = repoSlugFromCwd(cwd);
const host = `${slug}.localhost`;
const port = portForSlug(slug);

const caddyfilePath = path.join(os.homedir(), ".local", "etc", "Caddyfile");
const snippetsDir = path.join(os.homedir(), ".local", "etc", "caddy", "dev-sites");
const snippetPath = path.join(snippetsDir, `${slug}.caddy`);

mkdirSync(path.dirname(caddyfilePath), { recursive: true });
mkdirSync(snippetsDir, { recursive: true });
ensureCaddyImport(caddyfilePath, snippetsDir);
writeProjectSnippet(snippetPath, host, port);

try {
  ensureCaddyLoaded(caddyfilePath);
} catch (error) {
  if (error?.code === "ENOENT") {
    console.error("[dev-localhost] `caddy` was not found on PATH.");
    process.exit(1);
  }

  throw error;
}

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
