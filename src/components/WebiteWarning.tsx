import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import '../styles/WebsiteWarning.css';
import { useTranslation } from 'react-i18next';

const WebsiteWarning: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const {
    t,
    i18n: {},
  } = useTranslation();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (visible) {
      timeout = setTimeout(() => {
        setVisible(false);
      }, 10000);
    }

    return () => clearTimeout(timeout);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className={`WebsiteWarning ${visible ? '' : 'fadeOut'}`}>
          <div className="WebsiteWarning_close" onClick={handleClose}>
            <Icon type="close" stroke="var(--primary)" />
          </div>
          <div className="WebsiteWarning_text">
            {t('website_warning.title')}
            <br />
            <span className="WebsiteWarning_text_gray">
              {t('website_warning.subtitle')}
            </span>
          </div>
          {/* Fill div */}
          <div className="WebsiteWarning_fill" />
        </div>
      )}
    </>
  );
};

export default WebsiteWarning;
