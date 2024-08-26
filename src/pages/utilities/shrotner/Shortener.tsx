import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import { useState } from 'react';
import Button from '../../../components/Button.tsx';
import './Shortener.css';
import Icon from '../../../components/Icon.tsx';

export default function Shortener() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [service, setService] = useState<string>('is.gd');
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async () => {
    try {
      let apiUrl = '';
      if (service === 'is.gd') {
        apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
      } else if (service === 'tinyurl') {
        apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
      } else if (service === 'clckru') {
        apiUrl = `https://clck.ru/--?url=${encodeURIComponent(url)}`;
      } else if (service === 'vgd') {
        apiUrl = `https://v.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;
      } else if (service === 'dagd') {
        apiUrl = `https://da.gd/s?url=${encodeURIComponent(url)}`;
      }
      const response = await fetch(apiUrl);
      const shortUrl = await response.text();

      if (!shortUrl.startsWith('http')) {
        throw new Error('Invalid response from the URL shortening service');
      }

      setShortUrl(shortUrl);
      setError(null);
      setCopied(false); // Reset the copied state when a new URL is shortened
    } catch (err) {
      setError('Failed to shorten URL. Please try again.');
      setShortUrl(null);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true); // Set copied state to true when URL is copied
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
          { label: 'URL Shortener' },
        ]}
      />
      <Page gap="20px">
        <Title>URL Shortener</Title>

        <div className="url_shortener_container">
          <input
            type="text"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="Enter the URL to shorten"
            className="url_input"
          />
          <select
            name="shorten_type"
            id="shroten_type"
            value={service}
            onChange={e => setService(e.target.value)}
          >
            <option value="is.gd">is.gd</option>
            <option value="tinyurl">TinyURL</option>
            <option value="clckru">clck.ru</option>
            <option value="vgd">v.gd</option>
            <option value="dagd">da.gd</option>
          </select>
          {url ? (
            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              onClick={handleShortenUrl}
            >
              Shorten URL
            </Button>
          ) : (
            <Button
              color="var(--theme_primary_color_black)"
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              onClick={() => {}}
              style={{ cursor: 'not-allowed', opacity: 0.5 }}
            >
              Shorten URL
            </Button>
          )}
        </div>

        {shortUrl && (
          <div className="short_url_container">
            <p>
              Shortened URL:{' '}
              <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                {shortUrl}
              </a>
            </p>
            <div className="url_shortener_copy_container">
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

        {error && <p className="error_message">{error}</p>}
      </Page>
      <Footer />
    </>
  );
}
