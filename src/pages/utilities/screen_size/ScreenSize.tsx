import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import { Trans } from 'react-i18next';
import { useState, useEffect } from 'react';

export default function ScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update the screen size whenever the window is resized
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Screen Size' },
        ]}
      />

      <Page gap="20px" minHeight="80vh">
        <div
          style={{
            fontSize: '50px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: 900,
            textAlign: 'center',
            margin: 'auto',
          }}
        >
          {screenSize.width} x {screenSize.height}
        </div>
      </Page>
    </>
  );
}
