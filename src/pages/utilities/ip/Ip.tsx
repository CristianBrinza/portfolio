import { useState, useEffect } from 'react';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Page from '../../../components/Page.tsx';
import Title from '../../../components/Text/Title/Title.tsx';
import Button from '../../../components/Button.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import './Ip.css';

export default function Ip() {
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const [localIp, setLocalIp] = useState<string | null>(null);
  const [copied2, setCopied2] = useState<boolean>(false);

  useEffect(() => {
    // Fetch the public IP address
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip))
      .catch(error => console.error('Error fetching IP address:', error));
  }, []);

  const handleCopy = () => {
    if (ipAddress) {
      navigator.clipboard.writeText(ipAddress);
      setCopied(true);
    }
  };

  // Attempt to fetch the local IP address using WebRTC
  useEffect(() => {
    const getLocalIP = async () => {
      try {
        const peerConnection = new RTCPeerConnection();
        peerConnection.createDataChannel('');

        peerConnection.onicecandidate = event => {
          if (event && event.candidate) {
            const candidate = event.candidate.candidate;
            const ipMatch = candidate.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/);
            if (ipMatch) {
              setLocalIp(ipMatch[0]);
              peerConnection.close();
            }
          }
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
      } catch (error) {
        console.error('Error fetching local IP:', error);
      }
    };

    getLocalIP();
  }, []);

  const handleCopy2 = () => {
    if (localIp) {
      navigator.clipboard.writeText(localIp);
      setCopied2(true);
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
          { label: 'IP Address' },
        ]}
      />
      <Page gap="20px">
        <Title>IP Address</Title>
        <div className="ip_container">
          <h3>Global:</h3>
          <a href={`https://${ipAddress || '#'}`}>
            {ipAddress || 'Loading...'}
          </a>
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleCopy}
            disabled={!ipAddress}
          >
            Copy
          </Button>
          {copied && <span className="copied_text">Copied</span>}
        </div>
        <div className="ip_container">
          <h3>Local:</h3>
          <a href={`https://${localIp || '#'}`}>{localIp || 'Loading...'}</a>
          <Button
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
            onClick={handleCopy2}
            disabled={!localIp}
          >
            Copy
          </Button>
          {copied2 && <span className="copied_text">Copied</span>}
        </div>
      </Page>
      <Footer />
    </>
  );
}
