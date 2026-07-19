import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { isSupportedLanguage } from '../../seo/siteSeo';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: ReactNode;
  url?: string;
}

interface BreadcrumbProps {
  ariaLabel?: string;
  className?: string;
  items: BreadcrumbItem[];
}

const unlocalizedPaths = new Set(['/app', '/404', '/not-found']);

export default function Breadcrumb({
  ariaLabel,
  className = '',
  items,
}: BreadcrumbProps) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const routeLanguage = pathname.split('/').filter(Boolean)[0] ?? '';
  const language = isSupportedLanguage(routeLanguage) ? routeLanguage : 'en';

  if (items.length === 0) return null;

  const resolveUrl = (url: string) => {
    if (!url.startsWith('/') || unlocalizedPaths.has(url)) return url;
    if (url === '/') return `/${language}/`;

    const firstSegment = url.split('/').filter(Boolean)[0] ?? '';
    return isSupportedLanguage(firstSegment) ? url : `/${language}${url}`;
  };

  return (
    <nav
      aria-label={ariaLabel ?? t('navigation.breadcrumb')}
      className={`breadcrumb ${className}`.trim()}
    >
      <ol className="breadcrumb_list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const itemUrl = item.url ? resolveUrl(item.url) : undefined;

          return (
            <li
              className="breadcrumb_item"
              key={`${itemUrl ?? 'current'}-${index}`}
            >
              {isLast || !itemUrl ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={isLast ? 'breadcrumb_current' : 'breadcrumb_label'}
                >
                  {item.label}
                </span>
              ) : (
                <Link className="breadcrumb_link" to={itemUrl}>
                  {item.label}
                </Link>
              )}

              {!isLast && (
                <span aria-hidden="true" className="breadcrumb_separator">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
