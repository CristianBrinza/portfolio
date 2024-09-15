import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { useTranslation } from 'react-i18next';
import Title from '../components/Text/Title/Title.tsx';
import '../styles/Resume.css';
import Button from '../components/Button.tsx';
import Page from '../components/Page.tsx';
import Footer from '../components/Footer/Footer.tsx';

export default function Resume() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true); // Track image loading state

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: t('navigation.resume_page') },
  ];

  // Handle when the image has fully loaded
  const handleImageLoaded = () => {
    setIsLoading(false);
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = '/files/Resume.pdf'; // Path to your PDF file
    link.download = 'Resume.pdf'; // Name of the file to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Page gap="20px">
        <Title>Resume</Title>

        <div className="resume_page_btns">
          <Button
            to="/files/Resume.pdf"
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
          >
            View PDF
          </Button>
          <Button
            onClick={downloadPDF}
            color="var(--theme_primary_color_white)"
            bgcolor="var(--theme_primary_color_black)"
            border="var(--theme_primary_color_black)"
          >
            Download
          </Button>
        </div>

        <div className="resume_page_image_container">
          {isLoading && <div className="loading_spinner"></div>}{' '}
          {/* Show loading spinner */}
          <img
            id="resume_page_cv"
            src="/images/cv.jpg"
            alt="Resume"
            loading="lazy"
            onLoad={handleImageLoaded} // Call when image is loaded
            className={isLoading ? 'hidden_image' : 'visible_image'} // Apply opacity instead of hiding
          />
        </div>
      </Page>
      <Footer />
    </>
  );
}
