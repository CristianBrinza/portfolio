import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const siteUrl = "https://cristianbrinza.com";
const languages = ["en", "ro", "ru"];
const slugs = [
  "",
  "about",
  "blog",
  "contact",
  "portfolio",
  "cv",
  "certifications",
  "legal",
  "privacy",
  "utilities",
  "qr",
  "pdf-to-world",
  "shortener",
  "browser-history",
  "random-number-generator",
  "password-generator",
  "image-metadata-editor",
  "color-convertor",
  "name-validator",
  "json-formatter",
  "word-counter",
  "json-diff-tool",
  "stopwatch-timer",
  "image-color-picker",
  "screen-size",
  "ip",
  "portfolio-design",
  "portfolio-front-end",
  "portfolio-back-end",
];

const urlFor = (language, slug) =>
  `${siteUrl}/${language}/${slug ? `${slug}/` : ""}`;

const urls = slugs.flatMap((slug) =>
  languages.map((language) => {
    const alternates = languages
      .map(
        (alternateLanguage) =>
          `    <xhtml:link rel="alternate" hreflang="${alternateLanguage}" href="${urlFor(alternateLanguage, slug)}" />`,
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor("en", slug)}" />`,
      )
      .join("\n");

    return `  <url>\n    <loc>${urlFor(language, slug)}</loc>\n${alternates}\n  </url>`;
  }),
);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

const distDirectory = resolve(process.cwd(), "dist");
await mkdir(distDirectory, { recursive: true });
await writeFile(resolve(distDirectory, "sitemap.xml"), sitemap, "utf8");
console.log(`Generated sitemap.xml with ${urls.length} localized URLs.`);
