import { Trans } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import './utilities/qr/QR.css';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';
import '../styles/Utilities.css';
import Title from '../components/Text/Title/Title.tsx';
import Icon from '../components/Icon.tsx';
import Button from '../components/Button.tsx';

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
              <Icon type="qr" color="#1d1d1f" />
              <div className="utilities_item_text" style={{ color: '#1d1d1f' }}>
                QR generator
              </div>
            </Button>
            <Button
              to="/shortener"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_light_gray)"
              bgcolor="var(--theme_primary_color_light_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="url" color="#1d1d1f" />
              <div className="utilities_item_text" style={{ color: '#1d1d1f' }}>
                URL Shortener
              </div>
            </Button>
            <Button
              to="/name-validator"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_light_gray)"
              bgcolor="var(--theme_primary_color_light_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" color="#1d1d1f" />
              <div className="utilities_item_text" style={{ color: '#1d1d1f' }}>
                Name Validator
              </div>
            </Button>
            <Button
              to="/word-counter"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_light_gray)"
              bgcolor="var(--theme_primary_color_light_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" color="#1d1d1f" />
              <div className="utilities_item_text" style={{ color: '#1d1d1f' }}>
                Word Counter
              </div>
            </Button>
            <Button
              to="/stopwatch-timer"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_light_gray)"
              bgcolor="var(--theme_primary_color_light_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" color="#1d1d1f" />
              <div className="utilities_item_text" style={{ color: '#1d1d1f' }}>
                Stopwatch Timer
              </div>
            </Button>
          </div>
        </div>

        <div className="utilities_block">
          <div className="utilities_title">Develop</div>
          <div className="utilities_items">
            <Button
              to="/random-number-generator"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Random Number Generator</div>
            </Button>
            <Button
              to="/password-generator"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Password Generator</div>
            </Button>
            <Button
              to="/json-formatter"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">JSON Formatter</div>
            </Button>
            <Button
              to="/json-diff-tool"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">JSON Diff Tool</div>
            </Button>
            <Button
                to="/screen-size"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Screen Size</div>
            </Button>
            <Button
                to="/ip"
                className="utilities_item"
                color="var(--theme_primary_color_black)"
                border="var(--theme_primary_color_darkest_gray)"
                hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">My IP Address</div>
            </Button>
          </div>
        </div>
        <div className="utilities_block">
          <div className="utilities_title">Design</div>
          <div className="utilities_items">
            <Button
              to="/image-metadata-editor"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Image Metadata Editor</div>
            </Button>
            <Button
              to="/color-convertor"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Color Convertor</div>
            </Button>{' '}
            <Button
              to="/image-color-picker"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">Color Picker</div>
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
              <Icon type="copy" />
              <div className="utilities_item_text">
                {' '}
                Browser History Analyzer
              </div>
            </Button>
            <Button
              to="/pdf-to-world"
              className="utilities_item"
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_darkest_gray)"
              hover_bgcolor="var(--theme_primary_color_dark_gray)"
            >
              <Icon type="copy" />
              <div className="utilities_item_text">PDF to WORLD</div>
            </Button>
          </div>
        </div>
      </Page>
      <Footer />
    </>
  );
}
