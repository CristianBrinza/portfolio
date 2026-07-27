export const site = {
  name: "Cristian Brinza's Portfolio",
  owner: "Cristian Brinza",
  url: "https://cristianbrinza.com",
  summary:
    "The professional portfolio of Cristian Brinza, a software engineer, full-stack developer, and product designer based in Chișinău, Moldova.",
  description:
    "Cristian designs and builds digital products end to end, from product structure and interface design through front-end and back-end implementation.",
  email: "inbox@cristianbrinza.com",
  location: "Chișinău, Moldova",
  roles: ["Software Engineer", "Full-Stack Developer", "Product Designer"],
  languagesSpoken: ["Romanian", "English", "Russian", "French"],
  expertise: [
    "Software engineering",
    "Full-stack web development",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "MongoDB",
    "Product design",
    "UI/UX design",
    "Design systems",
    "Brand identity",
  ],
  services: [
    {
      name: "Product Design",
      description:
        "UX/UI, wireframes, prototypes, and design systems that turn ideas into clear, usable interfaces.",
    },
    {
      name: "Front-End Development",
      description:
        "Fast, accessible, responsive interfaces built with React and TypeScript.",
    },
    {
      name: "Back-End Development and APIs",
      description:
        "Node.js, Express, and MongoDB services with authentication, storage, and maintainable APIs.",
    },
    {
      name: "Brand and Identity",
      description:
        "Logos, visual systems, and art direction for personal and product brands.",
    },
  ],
  education: [
    {
      institution: "Technical University of Moldova",
      program: "Master's Degree in Digital Marketing",
      period: "2025–present",
    },
    {
      institution: "Technical University of Moldova",
      program: "Bachelor of Science in Software Engineering",
      period: "2021–2025",
    },
    {
      institution:
        "Center of Excellence in Informatics and Information Technologies",
      program: "Programming and Program Analysis",
      period: "2018–2022",
    },
  ],
  profiles: {
    GitHub: "https://github.com/CristianBrinza",
    LinkedIn: "https://www.linkedin.com/in/cristianbrinza/",
    Instagram: "https://www.instagram.com/brinza_cristian/",
    Telegram: "https://t.me/CristianBrinza",
  },
};

export const languages = ["en", "ro", "ru"];

export const answers = [
  {
    question: "Who is Cristian Brinza?",
    answer:
      "Cristian Brinza is a software engineer, full-stack developer, and product designer based in Chișinău, Moldova. He designs and builds web products from interface concept through front-end and back-end implementation.",
    sourceSlug: "about",
  },
  {
    question: "What services does Cristian Brinza provide?",
    answer:
      "Cristian provides product and UI/UX design, front-end development with React and TypeScript, back-end and API development with Node.js, Express, and MongoDB, plus brand identity and visual-system design.",
    sourceSlug: "",
  },
  {
    question: "What technologies does Cristian Brinza work with?",
    answer:
      "His core web stack includes React, TypeScript, Node.js, Express, and MongoDB. His broader expertise includes accessible responsive interfaces, APIs, authentication, storage, design systems, prototyping, and UI/UX design.",
    sourceSlug: "portfolio",
  },
  {
    question: "Does Cristian Brinza work on both design and development?",
    answer:
      "Yes. Cristian works across product structure, UX/UI and visual design, front-end implementation, back-end services, APIs, deployment, and ongoing product improvement.",
    sourceSlug: "portfolio",
  },
  {
    question: "Where is Cristian Brinza based?",
    answer: "Cristian Brinza is based in Chișinău, Moldova.",
    sourceSlug: "about",
  },
  {
    question: "What is Cristian Brinza's education?",
    answer:
      "Cristian earned a Bachelor of Science in Software Engineering from the Technical University of Moldova and studied Programming and Program Analysis at the Center of Excellence in Informatics and Information Technologies. He is pursuing a master's degree in Digital Marketing at the Technical University of Moldova.",
    sourceSlug: "about",
  },
  {
    question: "Which languages does Cristian Brinza speak?",
    answer: "Cristian speaks Romanian, English, Russian, and French.",
    sourceSlug: "about",
  },
  {
    question: "Where can I see Cristian Brinza's work?",
    answer:
      "The portfolio is organized into product and UI/UX design, front-end development, and back-end development sections, with a separate CV and certifications page.",
    sourceSlug: "portfolio",
  },
  {
    question: "Does the portfolio include free online tools?",
    answer:
      "Yes. The site includes free browser-based tools for QR codes, JSON formatting and comparison, passwords, color conversion, word counting, image utilities, screen size checking, timing, and other developer or productivity tasks.",
    sourceSlug: "utilities",
  },
  {
    question: "How can I contact Cristian Brinza about a project?",
    answer:
      "Use the portfolio contact page or email inbox@cristianbrinza.com for software engineering, product design, or digital-product collaboration inquiries.",
    sourceSlug: "contact",
  },
];

export const pageGroups = [
  {
    name: "Primary",
    pages: [
      {
        slug: "",
        title: "Home",
        description:
          "Profile overview, selected disciplines, services, useful links, and contact information.",
      },
      {
        slug: "about",
        title: "About Cristian Brinza",
        description:
          "Professional profile, work history, education, capabilities, and social links.",
      },
      {
        slug: "portfolio",
        title: "Selected Work",
        description:
          "An overview of selected product design, front-end, and back-end work.",
      },
      {
        slug: "cv",
        title: "CV and Experience",
        description:
          "Professional experience, software engineering skills, education, and technical background.",
      },
      {
        slug: "contact",
        title: "Contact",
        description:
          "Contact information for software engineering, design, and product collaborations.",
      },
      {
        slug: "answers",
        title: "Questions and Answers",
        description:
          "Concise, source-linked answers about Cristian Brinza's services, skills, education, portfolio, and contact details.",
        languages: ["en"],
      },
    ],
  },
  {
    name: "Portfolio",
    pages: [
      {
        slug: "portfolio/design",
        title: "Product and UI/UX Design",
        description:
          "Product design, interface design, visual systems, and selected UI/UX projects.",
      },
      {
        slug: "portfolio/front-end",
        title: "Front-End Development",
        description:
          "Responsive interfaces and modern web application projects.",
      },
      {
        slug: "portfolio/back-end",
        title: "Back-End Development",
        description:
          "APIs, integrations, data services, and full-stack application architecture.",
      },
      {
        slug: "certifications",
        title: "Certifications",
        description:
          "Professional certifications and completed learning programs.",
      },
      {
        slug: "blog",
        title: "Blog",
        description:
          "Articles, notes, and updates about software engineering, design, and technology.",
      },
    ],
  },
  {
    name: "Free browser utilities",
    pages: [
      {
        slug: "utilities",
        title: "Utilities",
        description:
          "A collection of free browser-based tools for developers, designers, and everyday productivity.",
      },
      {
        slug: "qr",
        title: "QR Code Generator",
        description: "Create a QR code directly in the browser.",
      },
      {
        slug: "pdf-to-world",
        title: "PDF to Word Converter",
        description: "Convert PDF content to an editable Word format.",
      },
      {
        slug: "shortener",
        title: "URL Shortener",
        description: "Create shorter, easier-to-share links.",
      },
      {
        slug: "browser-history",
        title: "Browser History Analyzer",
        description: "Analyze exported browser history data.",
      },
      {
        slug: "random-number-generator",
        title: "Random Number Generator",
        description: "Generate random numbers within a custom range.",
      },
      {
        slug: "password-generator",
        title: "Secure Password Generator",
        description: "Generate strong, configurable passwords locally.",
      },
      {
        slug: "image-metadata-editor",
        title: "Image Metadata Editor",
        description: "Inspect and edit image metadata.",
      },
      {
        slug: "color-convertor",
        title: "Color Converter",
        description: "Convert colors between common web formats.",
      },
      {
        slug: "name-validator",
        title: "Name Validator",
        description: "Validate and normalize names.",
      },
      {
        slug: "json-formatter",
        title: "JSON Formatter and Validator",
        description: "Format, inspect, and validate JSON.",
      },
      {
        slug: "word-counter",
        title: "Word and Character Counter",
        description: "Count words and characters instantly.",
      },
      {
        slug: "json-diff-tool",
        title: "JSON Diff Tool",
        description: "Compare two JSON documents for structural differences.",
      },
      {
        slug: "stopwatch-timer",
        title: "Stopwatch and Timer",
        description: "A simple online stopwatch and timer.",
      },
      {
        slug: "image-color-picker",
        title: "Image Color Picker",
        description: "Upload an image and pick precise colors from it.",
      },
      {
        slug: "screen-size",
        title: "Screen Size Checker",
        description: "Check the current viewport and screen dimensions.",
      },
      {
        slug: "ip",
        title: "IP Address Checker",
        description: "View basic information about the current public IP.",
      },
    ],
  },
  {
    name: "Policies",
    optional: true,
    pages: [
      {
        slug: "legal",
        title: "Legal Information",
        description: "Legal information and terms for the site.",
      },
      {
        slug: "privacy",
        title: "Privacy and Cookie Choices",
        description: "Privacy, cookies, analytics, and consent information.",
      },
    ],
  },
];

export const pages = pageGroups.flatMap((group) =>
  group.pages.map((page) => ({ ...page, group: group.name })),
);

export function pageUrl(slug, language = "en") {
  return `${site.url}/${language}/${slug ? `${slug}/` : ""}`;
}

export function markdownUrl(slug) {
  return `${pageUrl(slug)}index.html.md`;
}
