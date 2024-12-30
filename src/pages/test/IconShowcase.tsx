import Icon, { icons } from '../../components/Icon.tsx';
import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../components/Page.tsx';
import Title from '../../components/Text/Title/Title.tsx';

export default function IconShowcase() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: 'Icons Showcase' },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="0px">
        <Title>Icons Showcase</Title>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '20px 0',
            justifyContent: 'flex-start',
          }}
        >
          {Object.keys(icons).map(iconKey => (
            <div
              key={iconKey}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                width: '80px',
              }}
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
      </Page>
    </>
  );
}
