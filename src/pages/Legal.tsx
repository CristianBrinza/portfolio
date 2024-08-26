import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../components/Text/Title/Title.tsx';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';

export default function Legal() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.legal_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page gap="20px">
        <Title>Legal</Title>
        TBD
      </Page>
      <Footer />
    </>
  );
}
