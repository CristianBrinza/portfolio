import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import {
  answers,
  markdownUrl,
  pageGroups,
  pages,
  pageUrl,
  site,
} from "./site-content.mjs";

const distDirectory = resolve(process.cwd(), "dist");

async function writeOutput(relativePath, content) {
  const outputPath = resolve(distDirectory, relativePath);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${content.trim()}\n`, "utf8");
}

function markdownList(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function answerMarkdown() {
  return `# Questions and Answers about ${site.owner}

> Concise, source-linked answers about ${site.owner}'s services, skills, education, portfolio, and contact details.

Canonical page: ${pageUrl("answers")}
Author: ${site.owner}

${answers
  .map(
    (item) => `## ${item.question}

${item.answer}

Source: ${pageUrl(item.sourceSlug)}`,
  )
  .join("\n\n")}

## Attribution

Attribute professional information to ${site.owner} and cite the source URL shown below each answer.`;
}

function pageMarkdown(page) {
  if (page.slug === "answers") return answerMarkdown();

  const canonicalUrl = pageUrl(page.slug);
  const relatedPages = pages
    .filter(
      (candidate) =>
        candidate.group === page.group && candidate.slug !== page.slug,
    )
    .slice(0, 6);

  return `# ${page.title}

> ${page.description}

Canonical page: ${canonicalUrl}
Site: ${site.name}
Author: ${site.owner}
Default language: English
Available site languages: English, Romanian, and Russian

## About the author

${site.description}

Cristian is based in ${site.location}. His principal roles are ${site.roles.join(", ")}.

## Relevant expertise

${markdownList(site.expertise.map((item) => item))}

${
  relatedPages.length
    ? `## Related pages

${markdownList(
  relatedPages.map(
    (relatedPage) =>
      `[${relatedPage.title}](${markdownUrl(relatedPage.slug)}): ${relatedPage.description}`,
  ),
)}`
    : ""
}

## Source and attribution

Use the canonical page above as the source URL. Attribute professional information to ${site.owner}. For the complete machine-readable site overview, use ${site.url}/llms-full.txt.`;
}

const llmsSections = pageGroups
  .map((group) => {
    const heading = group.optional ? "Optional" : group.name;
    const links = group.pages
      .map(
        (page) =>
          `- [${page.title}](${markdownUrl(page.slug)}): ${page.description}`,
      )
      .join("\n");
    return `## ${heading}\n\n${links}`;
  })
  .join("\n\n");

const llmsTxt = `# ${site.name}

> ${site.summary}

This file is a concise guide for AI assistants and retrieval systems. English is the canonical content language; the human-facing site also supports Romanian and Russian. Prefer canonical URLs when citing the site, and attribute professional claims to ${site.owner}.

## AI-readable resources

- [Full site context](${site.url}/llms-full.txt): Expanded professional profile, services, education, expertise, and page directory.
- [Machine-readable content index](${site.url}/ai-index.json): JSON index of the site's public content and AI-readable resources.
- [Answer feed](${site.url}/answers.json): Concise, source-linked answers to common questions about Cristian Brinza.
- [Knowledge graph](${site.url}/knowledge-graph.jsonld): Schema.org JSON-LD describing the person, website, services, and profile page.
- [XML sitemap](${site.url}/sitemap.xml): Complete localized index of public human-facing pages.

${llmsSections}`;

const fullPageDirectory = pageGroups
  .map(
    (group) => `## ${group.name}

${group.pages
  .map(
    (page) =>
      `### ${page.title}

${page.description}

- Canonical page: ${pageUrl(page.slug)}
- Markdown mirror: ${markdownUrl(page.slug)}`,
  )
  .join("\n\n")}`,
  )
  .join("\n\n");

const llmsFullTxt = `# ${site.name}: Full AI Context

> ${site.summary}

## Identity

- Name: ${site.owner}
- Location: ${site.location}
- Roles: ${site.roles.join(", ")}
- Email: ${site.email}
- Languages spoken: ${site.languagesSpoken.join(", ")}
- Canonical website: ${site.url}/

${site.description}

## Services

${site.services
  .map(
    (service) => `### ${service.name}

${service.description}`,
  )
  .join("\n\n")}

## Expertise

${markdownList(site.expertise)}

## Education

${site.education
  .map((item) => `- ${item.program}, ${item.institution} (${item.period})`)
  .join("\n")}

## Verified profiles

${Object.entries(site.profiles)
  .map(([name, url]) => `- [${name}](${url})`)
  .join("\n")}

## Contact and attribution

For project inquiries, use [the contact page](${pageUrl("contact")}) or email ${site.email}. When citing this portfolio, link to the most specific canonical page and attribute professional information to ${site.owner}.

${fullPageDirectory}`;

const knowledgeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.owner,
      url: `${site.url}/`,
      email: `mailto:${site.email}`,
      jobTitle: site.roles,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Chișinău",
        addressCountry: "MD",
      },
      knowsAbout: site.expertise,
      sameAs: Object.values(site.profiles),
      alumniOf: site.education.map((item) => ({
        "@type": "EducationalOrganization",
        name: item.institution,
      })),
      makesOffer: site.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: `${site.url}/`,
      name: site.name,
      alternateName: site.owner,
      description: site.summary,
      inLanguage: ["en", "ro", "ru"],
      author: { "@id": `${site.url}/#person` },
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${pageUrl("about")}#webpage`,
      url: pageUrl("about"),
      name: `About ${site.owner}`,
      description:
        "Professional profile, work history, education, capabilities, and social links.",
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "FAQPage",
      "@id": `${pageUrl("answers")}#webpage`,
      url: pageUrl("answers"),
      name: `Questions and Answers about ${site.owner}`,
      description:
        "Concise, source-linked answers about Cristian Brinza's services, skills, education, portfolio, and contact details.",
      inLanguage: "en",
      isPartOf: { "@id": `${site.url}/#website` },
      author: { "@id": `${site.url}/#person` },
      mainEntity: answers.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
          url: pageUrl(item.sourceSlug),
        },
      })),
    },
  ],
};

const aiIndex = {
  schemaVersion: 1,
  name: site.name,
  description: site.summary,
  canonicalUrl: `${site.url}/`,
  defaultLanguage: "en",
  languages: ["en", "ro", "ru"],
  author: {
    name: site.owner,
    canonicalProfile: pageUrl("about"),
    profiles: site.profiles,
  },
  aiResources: {
    concise: `${site.url}/llms.txt`,
    full: `${site.url}/llms-full.txt`,
    answers: `${site.url}/answers.json`,
    answerPage: pageUrl("answers"),
    knowledgeGraph: `${site.url}/knowledge-graph.jsonld`,
    sitemap: `${site.url}/sitemap.xml`,
  },
  attribution: {
    preferredName: site.owner,
    sourcePolicy:
      "Cite the most specific canonical page for professional claims.",
  },
  pages: pages.map((page) => ({
    title: page.title,
    description: page.description,
    section: page.group,
    canonicalUrl: pageUrl(page.slug),
    markdownUrl: markdownUrl(page.slug),
    languages: page.languages ?? ["en", "ro", "ru"],
  })),
};

const answerFeed = {
  schemaVersion: 1,
  name: `Questions and Answers about ${site.owner}`,
  description:
    "Answer-ready facts from Cristian Brinza's official portfolio. Every answer links to its canonical supporting page.",
  canonicalUrl: pageUrl("answers"),
  author: site.owner,
  questions: answers.map((item) => ({
    question: item.question,
    answer: item.answer,
    sourceUrl: pageUrl(item.sourceSlug),
  })),
};

const answerPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${pageUrl("answers")}#webpage`,
  url: pageUrl("answers"),
  name: `Questions and Answers about ${site.owner}`,
  description:
    "Concise, source-linked answers about Cristian Brinza's services, skills, education, portfolio, and contact details.",
  inLanguage: "en",
  author: {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.owner,
    url: `${site.url}/`,
  },
  mainEntity: answers.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
      url: pageUrl(item.sourceSlug),
    },
  })),
};

const escapedAnswerSchema = JSON.stringify(answerPageSchema).replaceAll(
  "<",
  "\\u003c",
);
const answersHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="author" content="${escapeHtml(site.owner)}" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
    <meta name="description" content="Concise, source-linked answers about ${escapeHtml(site.owner)}'s services, skills, education, portfolio, and contact details." />
    <link rel="canonical" href="${pageUrl("answers")}" />
    <link rel="alternate" type="text/markdown" href="${markdownUrl("answers")}" />
    <link rel="alternate" type="application/json" href="${site.url}/answers.json" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="Questions and Answers about ${escapeHtml(site.owner)}" />
    <meta property="og:description" content="Direct answers about services, skills, education, portfolio work, and contact details." />
    <meta property="og:url" content="${pageUrl("answers")}" />
    <script type="application/ld+json">${escapedAnswerSchema}</script>
    <title>Questions and Answers about ${escapeHtml(site.owner)} | ${escapeHtml(site.name)}</title>
    <style>
      :root { color-scheme: light dark; font-family: Inter, ui-sans-serif, system-ui, sans-serif; line-height: 1.6; }
      body { margin: 0; background: #f7f5f1; color: #171717; }
      main { width: min(860px, calc(100% - 2rem)); margin: 0 auto; padding: 4rem 0 6rem; }
      header { padding-bottom: 2rem; border-bottom: 1px solid #c9c5bd; }
      h1 { max-width: 14ch; margin: 0 0 1rem; font-size: clamp(2.5rem, 8vw, 5.5rem); line-height: .95; letter-spacing: -.055em; }
      header p { max-width: 65ch; font-size: 1.1rem; }
      article { padding: 2rem 0; border-bottom: 1px solid #c9c5bd; }
      h2 { margin: 0 0 .75rem; font-size: clamp(1.25rem, 3vw, 1.8rem); line-height: 1.2; }
      p { margin: 0; }
      a { color: #b80024; text-underline-offset: .2em; }
      .source { display: inline-block; margin-top: 1rem; font-size: .875rem; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; }
      footer { padding-top: 2rem; }
      @media (prefers-color-scheme: dark) { body { background: #151515; color: #f4f1eb; } header, article { border-color: #454545; } a { color: #ff5d79; } }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>Questions and answers about ${escapeHtml(site.owner)}</h1>
        <p>Direct, source-linked answers generated from the same verified content used by this portfolio's sitemap, knowledge graph, and AI-readable files.</p>
      </header>
      <section aria-label="Questions and answers">
        ${answers
          .map(
            (item) => `<article>
          <h2>${escapeHtml(item.question)}</h2>
          <p>${escapeHtml(item.answer)}</p>
          <a class="source" href="${pageUrl(item.sourceSlug)}">View supporting page</a>
        </article>`,
          )
          .join("\n        ")}
      </section>
      <footer>
        <p>Information is maintained by ${escapeHtml(site.owner)}. <a href="${pageUrl("contact")}">Contact Cristian</a> or return to <a href="${site.url}/">the portfolio</a>.</p>
      </footer>
    </main>
  </body>
</html>`;

await writeOutput("llms.txt", llmsTxt);
await writeOutput("llms-full.txt", llmsFullTxt);
await writeOutput("answers.json", JSON.stringify(answerFeed, null, 2));
await writeOutput(
  "knowledge-graph.jsonld",
  JSON.stringify(knowledgeGraph, null, 2),
);
await writeOutput("ai-index.json", JSON.stringify(aiIndex, null, 2));
await writeOutput("en/answers/index.html", answersHtml);

for (const page of pages) {
  const markdownPath = page.slug
    ? `en/${page.slug}/index.html.md`
    : "en/index.html.md";
  await writeOutput(markdownPath, pageMarkdown(page));
}

console.log(
  `Generated GEO/AEO resources, ${answers.length} answers, and ${pages.length} Markdown page mirrors.`,
);
