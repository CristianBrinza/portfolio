import Icon, { icons } from '../../components/Icon.tsx';
import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../components/Page.tsx';
import Title from '../../components/Text/Title/Title.tsx';
import Input from '../../components/input/Input.tsx';
import { useState } from 'react';
import Footer from '../../components/Footer/Footer.tsx';
import { useNavigate } from 'react-router-dom';

export default function IconShowcase() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: 'Icons Showcase' },
  ];
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="0px">
        <Title>Icons Showcase</Title>
        Welcome to the Icons Showcase! This collection features a variety of
        open-source icons sourced from different creators and repositories. Use
        the search bar to find icons by name and explore the possibilities for
        your projects. Each icon is labeled with its unique identifier for easy
        reference and integration.
        <br />
        <br />
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={setSearchQuery}
          icon="search"
        />
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '20px 0',
            justifyContent: 'flex-start',
          }}
        >
          {Object.keys(icons)
            .filter(iconKey =>
              iconKey.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map(iconKey => (
              <div
                key={iconKey}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  width: '80px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/icon/${iconKey}`)}
              >
                <Icon type={iconKey as keyof typeof icons} size="40px" />
                <span
                  style={{ marginTop: '5px', fontSize: '12px', color: '#555' }}
                >
                  {iconKey}
                </span>
              </div>
            ))}
        </div>
        <div id="portfolio_front_page_disclaimer">
          <b>Disclaimer !</b> - The icons displayed on this page are open-source
          and sourced from various designers and repositories. They are provided
          as-is and are not exclusively created or owned by this project. Please
          check the respective licenses of the icons before using them in your
          applications to ensure compliance with the creators' terms.
        </div>
      </Page>
      <Footer />
    </>
  );
}
