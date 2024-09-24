import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from '../components/Footer/Footer.tsx';
import styles from '../styles/NotFound.module.css';
import Page from '../components/Page.tsx';
import Icon from '../components/Icon.tsx';

export default function NotFound() {
  const [pageHeight, setPageHeight] = useState('calc(100vh - 160px)');

  useEffect(() => {
    // Update the height based on the actual viewport height for mobile devices
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      setPageHeight(`calc(${vh * 100}px - 160px)`);
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize); // Recalculate on resize

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup
    };
  }, []);

  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.not_found_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page
        className={styles.not_found_page}
        gap="20px"
        style={{ minHeight: pageHeight }}
      >
        <div style={{ height: '80px', width: '80px' }}>
          <Icon
            type="info"
            size="80px"
            color="var(--theme_primary_color_darkest_gray"
          />
        </div>
        <h1>
          404 <span id={styles.not_found_page_dash}>-</span>
          <br id={styles.not_found_page_br} /> Not Found
        </h1>

        <div className={styles.not_found_page_under}>
          There’s no page at this address <br />
          Check the URL and try again, or use the search field to find what you
          need.
          <br />
          <br />
          If there should be something here{' '}
          <a href="https://github.com/CristianBrinza/portfolio/issues/new?title=[cristianbrinza.com] 404 not found&amp;labels=polaris.shopify.com">
            let us know
          </a>
          .
        </div>
      </Page>
      <Footer />
    </>
  );
}
