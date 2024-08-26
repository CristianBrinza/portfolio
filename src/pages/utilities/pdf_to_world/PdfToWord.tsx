import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Page from '../../../components/Page.tsx';
import Title from '../../../components/Text/Title/Title.tsx';
import Button from '../../../components/Button.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import './PdfToWorld.css';

export default function PdfToWord() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'PDF to Word' },
        ]}
      />
      <Page gap="20px">
        <Title>PDF to Word Converter</Title>
        <div className="pdf_to_word_container">
          <input type="file" accept="application/pdf" className="file_input" />
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
          >
            Convert to Word
          </Button>
        </div>
      </Page>
      <Footer />
    </>
  );
}
