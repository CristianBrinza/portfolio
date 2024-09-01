import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Button from '../../../components/Button.tsx';
import Icon from '../../../components/Icon.tsx';
import { Trans } from 'react-i18next';
import './RandomNumberGenerator.css';

export default function RandomNumberGenerator() {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [generatedNumber, setGeneratedNumber] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [includeFloat, setIncludeFloat] = useState(false);

  const generateRandomNumber = () => {
    let min = Math.min(minValue, maxValue);
    let max = Math.max(minValue, maxValue);
    let randomNumber = includeFloat
      ? parseFloat((Math.random() * (max - min) + min).toFixed(6))
      : Math.floor(Math.random() * (max - min + 1)) + min;
    setGeneratedNumber(randomNumber);
    setCopied(false);
  };

  const handleCopy = () => {
    if (generatedNumber !== null) {
      navigator.clipboard.writeText(generatedNumber.toString());
      setCopied(true);
    }
  };

  const resetFields = () => {
    setMinValue(0);
    setMaxValue(100);
    setGeneratedNumber(null);
    setCopied(false);
    setIncludeFloat(false);
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
          { label: 'Random Number Generator' },
        ]}
      />

      <Page gap="20px">
        <Title>Random Number Generator</Title>

        <div className="rng_container">
          <input
            type="number"
            value={minValue}
            onChange={e => setMinValue(parseFloat(e.target.value))}
            placeholder="Min Value"
            className="rng_input"
          />
          <input
            type="number"
            value={maxValue}
            onChange={e => setMaxValue(parseFloat(e.target.value))}
            placeholder="Max Value"
            className="rng_input"
          />

          <label className="rng_checkbox_label">
            <input
              type="checkbox"
              checked={includeFloat}
              onChange={() => setIncludeFloat(!includeFloat)}
              className="rng_checkbox"
            />
            <span>Include Float</span>
          </label>

          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={generateRandomNumber}
          >
            Generate
          </Button>

          {generatedNumber !== null && (
            <Button
              color="var(--theme_primary_color_black)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              onClick={resetFields}
            >
              Reset
            </Button>
          )}
        </div>

        {generatedNumber !== null && (
          <div className="rng_result">
            <p id="rng_result_number">Generated Number: {generatedNumber}</p>
            <Button
              color="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={handleCopy}
            >
              Copy <Icon color="var(--theme_primary_color_black)" type="copy" />
            </Button>
            {copied && (
              <span
                style={{
                  marginLeft: '10px',
                  color: '#4DD181',
                  fontWeight: 400,
                }}
              >
                Copied
              </span>
            )}
          </div>
        )}
      </Page>
      <Footer />
    </>
  );
}
