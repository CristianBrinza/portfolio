import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { Trans } from 'react-i18next';
import './NameValidator.css';
import Button from '../../../components/Button.tsx';
import { useState } from 'react';
import Icon from '../../../components/Icon.tsx';

export default function NameValidator() {
  const [inputName, setInputName] = useState('');
  const [validName, setValidName] = useState('');
  const [copied, setCopied] = useState(false);

  const validateName = (name: string) => {
    // Remove invalid characters for Windows file names: \ / : * ? " < > |
    const sanitized = name.replace(/[\\\/:*?"<>|]/g, '_');
    setValidName(sanitized);
    setCopied(false); // Reset the copied state when a new name is validated
  };

  const emptyInput = () => {
    setInputName(''); // Clear the input field
    setValidName(''); // Clear the validated name
    setCopied(false); // Reset the copied state
  };

  const handleCopy = () => {
    if (validName) {
      navigator.clipboard.writeText(validName);
      setCopied(true); // Set copied state to true when name is copied
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', url: '/' },
          {
            label: <Trans>navigation.utilities_page</Trans>,
            url: '/utilities',
          },
          { label: 'Name Validator' },
        ]}
      />

      <Page gap="20px">
        <Title>Name Validator</Title>
        <div className="validator_container">
          {inputName && (
            <Button
              style={{ padding: '3px 20px' }}
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              onClick={emptyInput}
            >
              <Icon type="close" color="var(--theme_primary_color_black)" />
            </Button>
          )}
          <input
            type="text"
            value={inputName}
            id="validator_input"
            onChange={e => {
              setInputName(e.target.value);
              validateName(e.target.value);
            }}
            placeholder="Enter a name"
          />
          {validName ? (
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={handleCopy}
            >
              Convert & Copy
            </Button>
          ) : (
            <Button
              color="var(--theme_primary_color_black)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              onClick={() => {}}
              style={{ cursor: 'not-allowed', opacity: 0.5 }}
            >
              Convert & Copy
            </Button>
          )}
          {copied && (
            <span
              style={{ marginLeft: '10px', color: '#4DD181', fontWeight: 400 }}
            >
              Copied
            </span>
          )}
        </div>

        {validName && (
          <div className="valid_name_container">
            <p>Validated Name: {validName}</p>
          </div>
        )}
      </Page>
      <Footer />
    </>
  );
}
