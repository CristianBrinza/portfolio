import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SITE_NAME,
  SUPPORTED_LANGUAGES,
  absoluteUrl,
  getRouteSeo,
} from '../../seo/siteSeo';
import SEO from './SEO';

export default function RouteSEO() {
  const { pathname } = useLocation();
  const page = getRouteSeo(pathname);

  const alternates = useMemo(() => {
    if (page.noIndex) return [];
    const slug = page.canonicalPath
      .split('/')
      .filter(Boolean)
      .slice(1)
      .join('/');
    const localized = SUPPORTED_LANGUAGES.map(language => ({
      hrefLang: language,
      href: absoluteUrl(`/${language}/${slug}`),
    }));
    return [
      ...localized,
      { hrefLang: 'x-default', href: absoluteUrl(`/en/${slug}`) },
    ];
  }, [page.canonicalPath, page.noIndex]);

  const breadcrumbs = useMemo(() => {
    if (
      page.noIndex ||
      page.canonicalPath.split('/').filter(Boolean).length < 2
    ) {
      return [];
    }
    return [
      { name: SITE_NAME, url: absoluteUrl(`/${page.language}`) },
      { name: page.breadcrumbName, url: absoluteUrl(page.canonicalPath) },
    ];
  }, [page]);

  return (
    <SEO
      title={page.title}
      description={page.description}
      canonicalPath={page.canonicalPath}
      language={page.language}
      noIndex={page.noIndex}
      pageType={page.pageType}
      alternates={alternates}
      breadcrumbs={breadcrumbs}
    />
  );
}
