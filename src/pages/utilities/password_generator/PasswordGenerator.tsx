import { useState } from 'react';
import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Button from '../../../components/Button.tsx';
import Icon from '../../../components/Icon.tsx';
import { Trans } from 'react-i18next';
import './PasswordGenerator.css';

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [includeCustom, setIncludeCustom] = useState<boolean>(false);
  const [customChars, setCustomChars] = useState<string>('');
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);
  const [password, setPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [strength, setStrength] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const ambiguousChars = '1l0O';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChars = '0123456789';
  const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  const generatePassword = () => {
    let characterPool = '';

    if (includeLowercase) characterPool += lowercaseChars;
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;
    if (includeCustom) characterPool += customChars;

    if (excludeAmbiguous) {
      characterPool = characterPool
        .split('')
        .filter(char => !ambiguousChars.includes(char))
        .join('');
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    // Format password with hyphens similar to Apple's style
    const formattedPassword =
      generatedPassword.match(/.{1,4}/g)?.join('-') || generatedPassword;

    setPassword(formattedPassword);
    setCopied(false);
    evaluateStrength(formattedPassword);
  };

  const evaluateStrength = (pwd: string) => {
    let score = 0;
    if (includeUppercase) score++;
    if (includeLowercase) score++;
    if (includeNumbers) score++;
    if (includeSymbols) score++;
    if (excludeAmbiguous) score--;

    if (pwd.length >= 16 && score >= 4) {
      setStrength('Strong');
    } else if (pwd.length >= 12 && score >= 3) {
      setStrength('Medium');
    } else {
      setStrength('Weak');
    }
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
    }
  };

  const resetFields = () => {
    setLength(16);
    setIncludeUppercase(true);
    setIncludeLowercase(true);
    setIncludeNumbers(true);
    setIncludeSymbols(false);
    setIncludeCustom(false);
    setCustomChars('');
    setExcludeAmbiguous(true);
    setPassword(null);
    setCopied(false);
    setStrength('');
    setShowPassword(false);
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
          { label: 'Password Generator' },
        ]}
      />

      <Page gap="20px">
        <Title>Password Generator</Title>

        <div className="pg_container">
          <div className="pg_options">
            <label>
              Length:
              <input
                type="number"
                value={length}
                onChange={e => setLength(parseInt(e.target.value))}
                min={12}
                max={32}
                className="pg_input"
              />
            </label>
            <label>
              Include Uppercase:
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={() => setIncludeUppercase(!includeUppercase)}
                className="pg_checkbox"
              />
            </label>
            <label>
              Include Lowercase:
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={() => setIncludeLowercase(!includeLowercase)}
                className="pg_checkbox"
              />
            </label>
            <label>
              Include Numbers:
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(!includeNumbers)}
                className="pg_checkbox"
              />
            </label>
            <label>
              Include Symbols:
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols(!includeSymbols)}
                className="pg_checkbox"
              />
            </label>
            <label>
              Exclude Ambiguous Characters:
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={() => setExcludeAmbiguous(!excludeAmbiguous)}
                className="pg_checkbox"
              />
            </label>
            <label>
              Custom Characters:
              <input
                type="text"
                value={customChars}
                onChange={e => setCustomChars(e.target.value)}
                className="pg_input"
                placeholder="Add custom chars"
                disabled={!includeCustom}
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={includeCustom}
                onChange={() => setIncludeCustom(!includeCustom)}
                className="pg_checkbox"
              />
              Enable Custom Characters
            </label>
          </div>

          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={generatePassword}
          >
            Generate
          </Button>

          {password && (
            <div className="pg_result">
              <p id="pg_result_password">
                {showPassword ? password : '•'.repeat(password.length)}
              </p>
              <div className="pg_result_goup">
                <Button
                  color="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_black)"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'} Password
                </Button>
                <Button
                  color="var(--theme_primary_color_black)"
                  border="var(--theme_primary_color_black)"
                  onClick={handleCopy}
                >
                  Copy{' '}
                  <Icon color="var(--theme_primary_color_black)" type="copy" />
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
            </div>
          )}

          {strength && (
            <div className={`pg_strength ${strength.toLowerCase()}`}>
              Password Strength: {strength}
            </div>
          )}

          <Button
            color="var(--theme_primary_color_black)"
            bgcolor="var(--theme_primary_color_dark_gray)"
            onClick={resetFields}
            style={{ marginTop: '20px' }}
          >
            Reset
          </Button>
        </div>
      </Page>
      <Footer />
    </>
  );
}
