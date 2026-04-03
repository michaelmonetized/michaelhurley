#!/usr/bin/env node

import path from "node:path";

const slug = path
  .basename(process.cwd())
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

let hash = 0;
for (const ch of slug) {
  hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
}

const port = 3300 + (hash % 5000);
const host = `${slug}.localhost`;

console.log(JSON.stringify({ slug, host, port, url: `https://${host}` }, null, 2));
