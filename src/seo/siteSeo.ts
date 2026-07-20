export const SITE_URL = 'https://cristianbrinza.com';
export const SITE_NAME = "Cristian Brinza's Portfolio";
export const DEFAULT_SOCIAL_IMAGE = '/images/app/icon_logo_app_512.png';

export const SUPPORTED_LANGUAGES = ['en', 'ro', 'ru'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export type SchemaPageType =
  'WebPage' | 'ProfilePage' | 'CollectionPage' | 'ContactPage';

interface PageSeoDefinition {
  title: string;
  description: string;
  canonicalSlug?: string;
  pageType?: SchemaPageType;
}

const PUBLIC_PAGE_SEO: Record<string, PageSeoDefinition> = {
  '': {
    title: "Cristian Brinza's Portfolio | Designer & Full-Stack Developer",
    description:
      'The portfolio of Cristian Brinza, a software engineer, full-stack developer and designer in Chisinau, Moldova. Explore selected work, services and development tools.',
    pageType: 'ProfilePage',
  },
  about: {
    title: `About Cristian Brinza | ${SITE_NAME}`,
    description:
      'Learn about Cristian Brinza, his software engineering background, design experience, education and approach to building useful digital products.',
    pageType: 'ProfilePage',
  },
  blog: {
    title: `Blog | ${SITE_NAME}`,
    description:
      'Articles, notes and updates from Cristian Brinza about software engineering, full-stack development, design and technology.',
    pageType: 'CollectionPage',
  },
  contact: {
    title: `Contact Cristian Brinza | ${SITE_NAME}`,
    description:
      'Contact Cristian Brinza to discuss software engineering, full-stack development, design work, collaborations or new digital products.',
    pageType: 'ContactPage',
  },
  portfolio: {
    title: `Selected Work | ${SITE_NAME}`,
    description:
      'Explore selected design, front-end and back-end projects by Cristian Brinza, including product interfaces and full-stack web development.',
    pageType: 'CollectionPage',
  },
  cv: {
    title: `CV & Experience | ${SITE_NAME}`,
    description:
      "Review Cristian Brinza's professional experience, software engineering skills, education, projects and technical background.",
  },
  resume: {
    title: `CV & Experience | ${SITE_NAME}`,
    description:
      "Review Cristian Brinza's professional experience, software engineering skills, education, projects and technical background.",
    canonicalSlug: 'cv',
  },
  certifications: {
    title: `Certifications | ${SITE_NAME}`,
    description:
      "Browse Cristian Brinza's professional certifications and completed learning programs in software development, design and technology.",
    pageType: 'CollectionPage',
  },
  legal: {
    title: `Legal Information | ${SITE_NAME}`,
    description:
      "Read the legal information and terms that apply to Cristian Brinza's Portfolio and its online services.",
  },
  privacy: {
    title: `Privacy & Cookie Choices | ${SITE_NAME}`,
    description:
      "Review privacy, cookie and analytics-consent information for Cristian Brinza's Portfolio.",
  },
  utilities: {
    title: `Free Web Utilities | ${SITE_NAME}`,
    description:
      'Use free browser-based utilities created by Cristian Brinza for developers, designers and everyday productivity.',
    pageType: 'CollectionPage',
  },
  qr: {
    title: `QR Code Generator | ${SITE_NAME}`,
    description:
      'Create a QR code in your browser with a fast, simple utility from Cristian Brinza.',
  },
  'pdf-to-world': {
    title: `PDF to Word Converter | ${SITE_NAME}`,
    description:
      'Convert PDF content to an editable Word format with this browser-based utility from Cristian Brinza.',
  },
  shortener: {
    title: `URL Shortener | ${SITE_NAME}`,
    description:
      "Create a shorter, easier-to-share link with the URL shortener in Cristian Brinza's web utility collection.",
  },
  'browser-history': {
    title: `Browser History Analyzer | ${SITE_NAME}`,
    description:
      'Analyze exported browser history data with a practical browser-based utility from Cristian Brinza.',
  },
  'random-number-generator': {
    title: `Random Number Generator | ${SITE_NAME}`,
    description:
      'Generate random numbers within a custom range using this straightforward browser utility.',
  },
  'password-generator': {
    title: `Secure Password Generator | ${SITE_NAME}`,
    description:
      'Generate strong, configurable passwords locally in your browser with this free utility.',
  },
  'image-metadata-editor': {
    title: `Image Metadata Editor | ${SITE_NAME}`,
    description:
      'Inspect and edit image metadata with a focused browser-based tool from Cristian Brinza.',
  },
  'color-convertor': {
    title: `Color Converter | ${SITE_NAME}`,
    description:
      'Convert colors between common web formats with a quick tool for designers and developers.',
  },
  'name-validator': {
    title: `Name Validator | ${SITE_NAME}`,
    description:
      'Validate and normalize names with a practical browser utility from Cristian Brinza.',
  },
  'json-formatter': {
    title: `JSON Formatter & Validator | ${SITE_NAME}`,
    description:
      'Format, inspect and validate JSON in your browser with a clean developer utility.',
  },
  'word-counter': {
    title: `Word & Character Counter | ${SITE_NAME}`,
    description:
      'Count words and characters instantly with a lightweight browser-based writing utility.',
  },
  'json-diff-tool': {
    title: `JSON Diff Tool | ${SITE_NAME}`,
    description:
      'Compare two JSON documents and identify structural differences with this developer utility.',
  },
  'stopwatch-timer': {
    title: `Stopwatch & Timer | ${SITE_NAME}`,
    description:
      'Use a simple online stopwatch and timer built for focused work and everyday timing.',
  },
  'image-color-picker': {
    title: `Image Color Picker | ${SITE_NAME}`,
    description:
      'Upload an image and pick precise colors directly in your browser with this design utility.',
  },
  'screen-size': {
    title: `Screen Size Checker | ${SITE_NAME}`,
    description:
      'Check your current viewport and screen dimensions with a responsive-design utility.',
  },
  ip: {
    title: `IP Address Checker | ${SITE_NAME}`,
    description:
      'View basic information about your current public IP address with this online utility.',
  },
  'portfolio/design': {
    title: `Product & UI/UX Design | ${SITE_NAME}`,
    description:
      "Explore Cristian Brinza's product design and UI/UX work, process and selected interface projects.",
    pageType: 'CollectionPage',
  },
  'portfolio/front-end': {
    title: `Front-End Development | ${SITE_NAME}`,
    description:
      "Explore Cristian Brinza's front-end development work, including responsive interfaces and modern web applications.",
    pageType: 'CollectionPage',
  },
  'portfolio/back-end': {
    title: `Back-End Development | ${SITE_NAME}`,
    description:
      "Explore Cristian Brinza's back-end development work, APIs, integrations and full-stack application architecture.",
    pageType: 'CollectionPage',
  },
};

const PRIVATE_ROUTE_NAMES: Record<string, string> = {
  app: 'Portfolio App',
  login: 'Sign In',
  test: 'Test Page',
  offline: 'Offline Page',
  admin: 'Administration',
  guest: 'Guest Area',
  dashboard: 'Dashboard',
  share: 'Shared Files',
  'icons-showcase': 'Icon Showcase',
  icon: 'Icon Details',
  'add-files': 'File Upload',
  '404': 'Page Not Found',
  'not-found': 'Page Not Found',
};

export const INDEXABLE_SLUGS = Object.keys(PUBLIC_PAGE_SEO).filter(
  slug => slug !== 'resume'
);

export function isSupportedLanguage(value: string): value is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(value as SupportedLanguage);
}

export function normalizePath(pathname: string): string {
  const cleanPath = pathname.split(/[?#]/, 1)[0].replace(/\/{2,}/g, '/');
  if (cleanPath === '/') return '/';
  return `/${cleanPath.replace(/^\/+|\/+$/g, '')}`;
}

export function getLanguageAndSlug(pathname: string): {
  language: SupportedLanguage;
  slug: string;
} {
  const segments = normalizePath(pathname).split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';
  const hasLanguagePrefix = isSupportedLanguage(firstSegment);
  const language: SupportedLanguage = hasLanguagePrefix ? firstSegment : 'en';
  const slugStart = hasLanguagePrefix ? 1 : 0;
  return { language, slug: segments.slice(slugStart).join('/') };
}

export function isNoIndexPath(pathname: string): boolean {
  const path = normalizePath(pathname);
  const { slug } = getLanguageAndSlug(path);
  const firstSlug = slug.split('/')[0];

  return (
    path === '/app' ||
    path === '/404' ||
    path === '/not-found' ||
    [
      'login',
      'test',
      'offline',
      'admin',
      'guest',
      'dashboard',
      'share',
      'icons-showcase',
      'icon',
      'add-files',
      '404',
      'not-found',
    ].includes(firstSlug)
  );
}

function humanizeSlug(slug: string): string {
  const segments = slug.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] ?? 'Page';
  return lastSegment
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, character => character.toUpperCase());
}

export function getRouteSeo(pathname: string): PageSeoDefinition & {
  language: SupportedLanguage;
  canonicalPath: string;
  noIndex: boolean;
  breadcrumbName: string;
} {
  const path = normalizePath(pathname);
  const { language, slug } = getLanguageAndSlug(path);
  const noIndex = isNoIndexPath(path);
  const firstSlug = slug.split('/')[0];
  const publicDefinition = PUBLIC_PAGE_SEO[slug];

  if (publicDefinition) {
    const canonicalSlug = publicDefinition.canonicalSlug ?? slug;
    return {
      ...publicDefinition,
      language,
      canonicalPath: `/${language}/${canonicalSlug}`,
      noIndex: false,
      breadcrumbName: humanizeSlug(canonicalSlug || 'Home'),
    };
  }

  const pageName = noIndex
    ? (PRIVATE_ROUTE_NAMES[firstSlug] ?? humanizeSlug(slug))
    : humanizeSlug(slug);

  return {
    title: `${pageName} | ${SITE_NAME}`,
    description: noIndex
      ? `Private or internal page on ${SITE_NAME}.`
      : `Read ${pageName} on ${SITE_NAME}, featuring work and insights from software engineer and designer Cristian Brinza.`,
    language,
    canonicalPath: path,
    noIndex,
    breadcrumbName: pageName,
    pageType: 'WebPage',
  };
}

export function absoluteUrl(path: string): string {
  const normalizedPath = normalizePath(path);
  return normalizedPath === '/'
    ? `${SITE_URL}/`
    : `${SITE_URL}${normalizedPath}/`;
}
