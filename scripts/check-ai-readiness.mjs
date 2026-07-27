import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { answers, pages, site } from "./site-content.mjs";

const projectRoot = process.cwd();
const errors = [];

async function read(relativePath) {
  return readFile(resolve(projectRoot, relativePath), "utf8");
}

const [llms, llmsFull, answerHtml, robots, aiIndexText, answerFeedText] =
  await Promise.all([
    read("dist/llms.txt"),
    read("dist/llms-full.txt"),
    read("dist/en/answers/index.html"),
    read("dist/robots.txt"),
    read("dist/ai-index.json"),
    read("dist/answers.json"),
  ]);

if (!llms.startsWith(`# ${site.name}\n\n> `)) {
  errors.push("dist/llms.txt: expected an H1 followed by a blockquote summary");
}

for (const requiredUrl of [
  `${site.url}/llms-full.txt`,
  `${site.url}/answers.json`,
  `${site.url}/knowledge-graph.jsonld`,
  `${site.url}/sitemap.xml`,
]) {
  if (!llms.includes(requiredUrl)) {
    errors.push(`dist/llms.txt: missing discovery URL ${requiredUrl}`);
  }
}

for (const page of pages) {
  const canonicalUrl = `${site.url}/en/${page.slug ? `${page.slug}/` : ""}`;
  if (!llmsFull.includes(canonicalUrl)) {
    errors.push(`dist/llms-full.txt: missing public page ${canonicalUrl}`);
  }
}

const aiIndex = JSON.parse(aiIndexText);
const answerFeed = JSON.parse(answerFeedText);

if (aiIndex.pages.length !== pages.length) {
  errors.push(
    `dist/ai-index.json: expected ${pages.length} pages, found ${aiIndex.pages.length}`,
  );
}

if (answerFeed.questions.length !== answers.length) {
  errors.push(
    `dist/answers.json: expected ${answers.length} answers, found ${answerFeed.questions.length}`,
  );
}

for (const item of answers) {
  if (
    !answerHtml.includes(item.question) ||
    !answerHtml.includes(item.answer)
  ) {
    errors.push(
      `dist/en/answers/index.html: visible content is missing "${item.question}"`,
    );
  }
}

if (!answerHtml.includes('"@type":"FAQPage"')) {
  errors.push("dist/en/answers/index.html: missing FAQPage JSON-LD");
}

for (const crawler of [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
]) {
  if (!robots.includes(`User-agent: ${crawler}`)) {
    errors.push(`dist/robots.txt: missing explicit access for ${crawler}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    `AI readiness check passed for ${pages.length} pages and ${answers.length} answer-ready facts.`,
  );
}
