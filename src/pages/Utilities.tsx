import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import './utilities/qr/QR.css';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../styles/Utilities.css';
import Title from '../components/Text/Title/Title.tsx';
import Icon from '../components/Icon.tsx';
import Button from '../components/Button.tsx';
import RandomNumberGenerator from "./utilities/random_number_generator/RandomNumberGenerator.tsx";

export default function Utilities() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.utilities_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <Page gap="40px">
        <Title>Utilities & Resources</Title>
        <div className="utilities_block">
          <div className="utilities_title">General</div>
          <div className="utilities_items">
            <Button
                className="utilities_item"
                to="/qr"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_light_gray)"
                bgcolor="var(--theme_primary_color_light_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="qr"/>
              <div className="utilities_item_text">QR generator</div>
            </Button>
            <Button
                to="/shortener"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_light_gray)"
                bgcolor="var(--theme_primary_color_light_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="url"/>
              <div className="utilities_item_text">URL Shortener</div>
            </Button>
            <Button
                to="/name-validator"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_light_gray)"
                bgcolor="var(--theme_primary_color_light_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy"/>
              <div className="utilities_item_text">Name Validator</div>
            </Button>

          </div>
        </div>

        <div className="utilities_block">
          <div className="utilities_title">Developer</div>
          <div className="utilities_items">
            <Button
                to="/random-number-generator"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy"/>
              <div className="utilities_item_text">Random Number Generator</div>
            </Button>
            <Button
                to="/password-generator"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy"/>
              <div className="utilities_item_text">Password Generator</div>
            </Button>
          </div>
        </div>
        <div className="utilities_block">
          <div className="utilities_title">In work</div>
          <div className="utilities_items">
            <Button
                to="/browser-history"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy"/>
              <div className="utilities_item_text"> Browser History Analyzer</div>
            </Button>
            <Button
                to="/pdf-to-world"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy"/>
              <div className="utilities_item_text">PDF to WORLD</div>
            </Button>
          </div>
        </div>
      </Page>
      <Footer/>
    </>
  );
}
