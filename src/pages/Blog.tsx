import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ArrowUpRight from '../components/ArrowUpRight/ArrowUpRight.tsx';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import FeedbackMenu from '../components/FeedbackMenu/FeedbackMenu.tsx';
import Footer from '../components/Footer/Footer.tsx';
import { isSupportedLanguage } from '../seo/siteSeo.ts';
import styles from './Blog.module.css';

interface BlogItem {
  description: string;
  img?: string;
  news_type?: string;
  title: string;
  to?: string;
}

type LoadState = 'empty' | 'error' | 'loading' | 'ready';

function resolveBlogUrl(url: string, language: string) {
  if (!url.startsWith('/')) return url;

  const firstSegment = url.split('/').filter(Boolean)[0] ?? '';
  return isSupportedLanguage(firstSegment) ? url : `/${language}${url}`;
}

function BlogVisual({
  image,
  index,
  title,
}: {
  image?: string;
  index: number;
  title: string;
}) {
  return (
    <div className={styles.postVisual}>
      <div aria-hidden="true" className={styles.postFallback}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <i />
        <b>CB / JOURNAL</b>
      </div>
      {image && (
        <img
          alt=""
          decoding="async"
          loading={index === 0 ? 'eager' : 'lazy'}
          onError={event => {
            event.currentTarget.hidden = true;
          }}
          src={image}
          title={title}
        />
      )}
    </div>
  );
}

function BlogCard({
  index,
  item,
  language,
}: {
  index: number;
  item: BlogItem;
  language: string;
}) {
  const { t } = useTranslation();
  const isFeatured = index === 0;
  const hasLink = Boolean(item.to && item.to !== '#');
  const className = [
    styles.postCard,
    isFeatured ? styles.postCardFeatured : '',
    hasLink ? styles.postCardLinked : styles.postCardUnavailable,
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <div className={styles.postTopline}>
        <span>({String(index + 1).padStart(2, '0')})</span>
        <span>{item.news_type || t('blog_v2.card.note')}</span>
      </div>

      <BlogVisual image={item.img} index={index} title={item.title} />

      <div className={styles.postCopy}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <span className={styles.postAction}>
          <span>
            {hasLink ? t('blog_v2.card.read') : t('blog_v2.card.soon')}
          </span>
          <b aria-hidden="true">
            {hasLink ? <ArrowUpRight /> : <span>—</span>}
          </b>
        </span>
      </div>
    </>
  );

  if (!hasLink) {
    return <article className={className}>{content}</article>;
  }

  const url = resolveBlogUrl(item.to!, language);
  if (/^https?:\/\//i.test(url)) {
    return (
      <a className={className} href={url} rel="noreferrer" target="_blank">
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={url}>
      {content}
    </Link>
  );
}

function LoadingCards() {
  return (
    <div aria-label="Loading articles" className={styles.loadingGrid}>
      {Array.from({ length: 3 }, (_, index) => (
        <div aria-hidden="true" className={styles.loadingCard} key={index}>
          <span />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}

export default function Blog() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const routeLanguage = pathname.split('/').filter(Boolean)[0] ?? '';
  const language = isSupportedLanguage(routeLanguage) ? routeLanguage : 'en';
  const [posts, setPosts] = useState<BlogItem[]>([]);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const fetchBlogPosts = useCallback(async () => {
    setLoadState('loading');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}/json/blog`,
        { signal: controller.signal }
      );
      if (!response.ok) throw new Error('Blog feed is unavailable');

      const data: unknown = await response.json();
      const nextPosts = Array.isArray(data) ? (data as BlogItem[]) : [];
      setPosts(nextPosts);
      setLoadState(nextPosts.length > 0 ? 'ready' : 'empty');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Error fetching blog data:', error);
      }
      setPosts([]);
      setLoadState('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    void fetchBlogPosts();
  }, [fetchBlogPosts]);

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: t('navigation.blog_page') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.blogPage}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{t('blog_v2.hero.eyebrow')}</span>
            <h1>{t('blog_v2.hero.title')}</h1>
            <p>{t('blog_v2.hero.summary')}</p>
          </div>
        </header>

        <section
          aria-labelledby="blog-archive-title"
          className={styles.archive}
        >
          <div className={styles.archiveHeading}>
            <div>
              <span>{t('blog_v2.archive.eyebrow')}</span>
              <h2 id="blog-archive-title">{t('blog_v2.archive.title')}</h2>
            </div>
            <span className={styles.archiveCount}>
              {t('blog_v2.archive.count', { count: posts.length })}
            </span>
          </div>

          {loadState === 'loading' && <LoadingCards />}

          {loadState === 'ready' && (
            <div className={styles.postGrid}>
              {posts.map((item, index) => (
                <BlogCard
                  index={index}
                  item={item}
                  key={`${item.title}-${index}`}
                  language={language}
                />
              ))}
            </div>
          )}

          {(loadState === 'empty' || loadState === 'error') && (
            <div className={styles.emptyState}>
              <div className={styles.emptyCopy}>
                <span>
                  {loadState === 'error'
                    ? t('blog_v2.error.eyebrow')
                    : t('blog_v2.empty.eyebrow')}
                </span>
                <h3>
                  {loadState === 'error'
                    ? t('blog_v2.error.title')
                    : t('blog_v2.empty.title')}
                </h3>
                <p>
                  {loadState === 'error'
                    ? t('blog_v2.error.description')
                    : t('blog_v2.empty.description')}
                </p>
              </div>
              <div className={styles.emptyActions}>
                {loadState === 'error' && (
                  <button onClick={() => void fetchBlogPosts()} type="button">
                    {t('blog_v2.error.retry')} ↻
                  </button>
                )}
                <Link to={`/${language}/portfolio`}>
                  {t('blog_v2.empty.portfolio')}
                  <ArrowUpRight />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer type="2" />
      <FeedbackMenu />
    </>
  );
}
