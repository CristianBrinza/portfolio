import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';

export default function Portfolio() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.portfolio_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="main">
        <h1>Portfolio</h1>
      </div>
    </>
  );
}
