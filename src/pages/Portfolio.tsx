import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';

export default function Portfolio() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.portfolio_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="main">
        <Title>Portfolio</Title>
      </div>
    </>
  );
}
