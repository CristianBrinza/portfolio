import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { languages, pages, pageUrl, site } from "./site-content.mjs";

const urls = pages.flatMap((page) => {
  const pageLanguages = page.languages ?? languages;

  return pageLanguages.map((language) => {
    const alternates = pageLanguages
      .map(
        (alternateLanguage) =>
          `    <xhtml:link rel="alternate" hreflang="${alternateLanguage}" href="${pageUrl(page.slug, alternateLanguage)}" />`,
      )
      .concat(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl(page.slug)}" />`,
      )
      .join("\n");

    return `  <url>\n    <loc>${pageUrl(page.slug, language)}</loc>\n${alternates}\n  </url>`;
  });
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

const distDirectory = resolve(process.cwd(), "dist");
await mkdir(distDirectory, { recursive: true });
await writeFile(resolve(distDirectory, "sitemap.xml"), sitemap, "utf8");
console.log(
  `Generated sitemap.xml for ${site.name} with ${urls.length} localized URLs.`,
);
