import { readFile, readdir } from "node:fs/promises";
import { extname, resolve } from "node:path";

const projectRoot = process.cwd();
// Keep former-client branding out of portfolio identity and SEO surfaces while
// allowing it to appear legitimately in work-history content and built bundles.
const rootsToCheck = [
  "index.html",
  "vite.config.ts",
  "src/seo",
  "src/components/SEO",
  "public",
  "dist/index.html",
  "dist/manifest.webmanifest",
  "dist/sitemap.xml",
];
const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".svg",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
]);
const forbiddenBrandPatterns = [
  new RegExp(["mold", "telecom"].join(""), "i"),
  new RegExp(["mol", "telecom"].join(""), "i"),
];
const errors = [];

async function collectFiles(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = resolve(path, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)));
    } else if (entry.isFile() && textExtensions.has(extname(entry.name))) {
      files.push(entryPath);
    }
  }

  return files;
}

const files = [];
for (const root of rootsToCheck) {
  const path = resolve(projectRoot, root);
  if (extname(path)) {
    files.push(path);
  } else {
    files.push(...(await collectFiles(path)));
  }
}

for (const file of files) {
  const content = await readFile(file, "utf8");
  for (const pattern of forbiddenBrandPatterns) {
    if (pattern.test(content)) {
      errors.push(`${file}: contains forbidden portfolio branding ${pattern}`);
    }
  }
}

const indexHtml = await readFile(resolve(projectRoot, "index.html"), "utf8");
for (const requiredValue of [
  "Cristian Brinza's Portfolio",
  "https://cristianbrinza.com/",
]) {
  if (!indexHtml.includes(requiredValue)) {
    errors.push(`index.html: missing required value ${requiredValue}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `SEO branding check passed across ${files.length} source and generated files.`,
  );
}
