import { useEffect } from 'react';
import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_NAME,
  SITE_URL,
  SUPPORTED_LANGUAGES,
  absoluteUrl,
  type SchemaPageType,
  type SupportedLanguage,
} from '../../seo/siteSeo';

interface AlternateLink {
  hrefLang: string;
  href: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  language?: SupportedLanguage;
  noIndex?: boolean;
  pageType?: SchemaPageType;
  image?: string;
  imageAlt?: string;
  alternates?: AlternateLink[];
  breadcrumbs?: BreadcrumbItem[];
}

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) =>
    element?.setAttribute(name, value)
  );
  element.dataset.seoManaged = 'true';
}

function setLink(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([name, value]) =>
    element?.setAttribute(name, value)
  );
  element.dataset.seoManaged = 'true';
}

function localeFor(language: SupportedLanguage) {
  return { en: 'en_US', ro: 'ro_RO', ru: 'ru_RU' }[language];
}

export default function SEO({
  title,
  description,
  canonicalPath,
  language = 'en',
  noIndex = false,
  pageType = 'WebPage',
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = "Cristian Brinza's Portfolio logo",
  alternates = [],
  breadcrumbs = [],
}: SEOProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(canonicalPath);
    const socialImage = image.startsWith('http')
      ? image
      : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
    const robots = noIndex
      ? 'noindex, nofollow, noarchive'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

    document.title = title;
    document.documentElement.lang = language;

    setMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    });
    setMeta('meta[name="robots"]', { name: 'robots', content: robots });
    setMeta('meta[name="googlebot"]', {
      name: 'googlebot',
      content: robots,
    });
    setMeta('meta[name="author"]', {
      name: 'author',
      content: 'Cristian Brinza',
    });
    setMeta('meta[name="application-name"]', {
      name: 'application-name',
      content: SITE_NAME,
    });
    setMeta('meta[name="theme-color"]', {
      name: 'theme-color',
      content: '#ef002b',
    });

    setMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });
    setMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    });
    setMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: title,
    });
    setMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    setMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    setMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: socialImage,
    });
    setMeta('meta[property="og:image:alt"]', {
      property: 'og:image:alt',
      content: imageAlt,
    });
    setMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: localeFor(language),
    });

    setMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary',
    });
    setMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: title,
    });
    setMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    setMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: socialImage,
    });
    setMeta('meta[name="twitter:image:alt"]', {
      name: 'twitter:image:alt',
      content: imageAlt,
    });

    setLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    });

    document.head
      .querySelectorAll('link[data-seo-alternate="true"]')
      .forEach(element => element.remove());
    if (!noIndex) {
      alternates.forEach(({ hrefLang, href }) => {
        const link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = hrefLang;
        link.href = href;
        link.dataset.seoAlternate = 'true';
        document.head.appendChild(link);
      });
    }

    const existingStructuredData = document.getElementById(
      'portfolio-structured-data'
    );
    if (noIndex) {
      existingStructuredData?.remove();
      return;
    }

    const person = {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Cristian Brinza',
      url: `${SITE_URL}/`,
      email: 'mailto:inbox@cristianbrinza.com',
      telephone: '+37368745434',
      jobTitle: 'Software Engineer, Full-Stack Developer and Designer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chisinau',
        addressCountry: 'MD',
      },
      sameAs: [
        'https://github.com/CristianBrinza',
        'https://www.linkedin.com/in/cristianbrinza/',
        'https://www.instagram.com/brinza_cristian/',
        'https://t.me/CristianBrinza',
      ],
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Technical University of Moldova',
        url: 'https://utm.md/',
      },
      knowsAbout: [
        'Software engineering',
        'Full-stack web development',
        'Front-end development',
        'Back-end development',
        'Product design',
        'UI/UX design',
      ],
    };

    const webPage: Record<string, unknown> = {
      '@type': pageType,
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { '@id': WEBSITE_ID },
      author: { '@id': PERSON_ID },
    };
    if (pageType === 'ProfilePage') {
      webPage.mainEntity = { '@id': PERSON_ID };
    }

    const graph: Record<string, unknown>[] = [
      person,
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: 'Cristian Brinza',
        inLanguage: [...SUPPORTED_LANGUAGES],
        author: { '@id': PERSON_ID },
        publisher: { '@id': PERSON_ID },
      },
      webPage,
    ];

    if (breadcrumbs.length > 1) {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      });
      webPage.breadcrumb = { '@id': `${canonicalUrl}#breadcrumb` };
    }

    const script = existingStructuredData ?? document.createElement('script');
    script.id = 'portfolio-structured-data';
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
    if (!script.isConnected) document.head.appendChild(script);
  }, [
    alternates,
    breadcrumbs,
    canonicalPath,
    description,
    image,
    imageAlt,
    language,
    noIndex,
    pageType,
    title,
  ]);

  return null;
}
