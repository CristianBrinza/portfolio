// src/pages/About.tsx
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Footer from "../components/Footer/Footer.tsx";
import  "../styles/NotFound.css"
import Page from "../components/Page.tsx";

export default function NotFound() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.not_found_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page className="not_found_page">
        <h1>404 <span id="not_found_page_dash">-</span><br id="not_found_page_br"/> Not Found</h1>
      </Page>
        <Footer/>
    </>
  );
}
