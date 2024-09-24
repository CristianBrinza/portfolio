//pages/Home.tsx

import Navbar from '../components/Navbar/Navbar.tsx';
import BottomMenu from '../components/BottomMenu/BottomMenu.tsx';
import '../styles/Home.css';
import Hashtags from '../components/Hashtags/Hashtags.tsx';
import Title from '../components/Text/Title/Title.tsx';
import { useEffect, useState } from 'react';
import Parapraph from '../components/Text/Parapraph/Parapraph.tsx';
import Footer from '../components/Footer/Footer.tsx';
import LinkButton from '../components/LinkButton.tsx';
import useReveal from '../hooks/useReveal.tsx';
import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import Notification from '../components/Notification/Notification.tsx';

export default function Home() {
  const { t } = useTranslation(); // Get the t function from useTranslation
  const { language } = useLanguage(); // Get the current language from the context

  const [isSticky, setIsSticky] = useState(false);

  useReveal(); // Assuming this hook is for reveal animations

  // Handle scroll events to apply sticky class to elements
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set custom property and add event listeners
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    window.addEventListener('scroll', handleScroll);

    // Set viewport height on initial load
    setVH();

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  // Effect to trigger a re-render when the language changes
  useEffect(() => {
    // Any additional logic you want to apply when the language changes can go here
  }, [language]); // Re-run whenever the language changes

  useEffect(() => {
    const adjustHeroHeight = () => {
      const topNotification = document.getElementById('top_notification');
      const topNotificationHeight = topNotification
        ? topNotification.offsetHeight
        : 0;
      const heroHeight = topNotification
        ? window.innerHeight - topNotificationHeight
        : window.innerHeight;

      // Set the CSS variable for height
      document.documentElement.style.setProperty(
        '--hero-height',
        `${heroHeight - 4}px`
      );

      // Set the CSS variable for margin-top if #top_notification exists
      const marginTop = topNotification ? '-4px' : '0px';
      document.documentElement.style.setProperty(
        '--hero-margin-top',
        marginTop
      );
    };

    // Set initial hero height and margin-top, and update on resize
    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);

    return () => {
      window.removeEventListener('resize', adjustHeroHeight);
    };
  }, []);

  const [showNotification1, setShowNotification2] = useState(false); // For home_portfolio_block2
  const [showNotification3, setShowNotification3] = useState(false); // For home_portfolio_block3

  const handleNotificationClick1 = () => {
    setShowNotification2(true); // Show notification for block 2
    setTimeout(() => {
      setShowNotification2(false); // Hide notification after 10 seconds
    }, 10000);
  };

  const handleNotificationClick3 = () => {
    setShowNotification3(true); // Show notification for block 3
    setTimeout(() => {
      setShowNotification3(false); // Hide notification after 10 seconds
    }, 10000);
  };
  return (
    <>
      <div className={`home_hero_new ${isSticky ? 'sticky' : ''}`}>
        <Navbar />

        <div className={`main  page`}>
          <div className="home_hero">
            <svg
              className="home_hero_svg"
              xmlns="http://www.w3.org/2000/svg"
              width="217"
              height="217"
              viewBox="0 0 217 217"
              fill="none"
            >
              <rect width="217" height="217" fill="#222222" />
              <path
                d="M104.16 71.6099C104.16 71.6099 101.983 71.6101 57.3465 71.6099C12.7105 71.6096 12.7109 145.39 57.3465 145.39C101.982 145.39 104.16 145.39 104.16 145.39"
                stroke="white"
                strokeWidth="15.19"
              />
              <path
                d="M115.01 71.6099C115.01 71.6099 117.187 71.6101 161.823 71.6099C206.459 71.6096 206.458 145.39 161.823 145.39C117.187 145.39 115.01 145.39 115.01 145.39"
                stroke="white"
                strokeWidth="15.19"
              />
              <path
                d="M125.86 108.5C125.86 108.5 128.037 108.5 172.673 108.5"
                stroke="white"
                strokeWidth="15.19"
              />
              <path
                d="M123.227 85.0935C123.227 85.0935 123.227 87.2706 123.227 131.907"
                stroke="white"
                strokeWidth="15.19"
              />
            </svg>
            <div className="home_hero_text">
              <span className="home_hero_text_1">{t('home.hello')}</span>
              <br />
              <span className="home_hero_text_2">
                <Trans>home.imcristian</Trans>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={`main page`}>
        <div style={{ margin: '40px auto 0 auto', maxWidth: '980px' }}>
          <Hashtags
            tags={[
              'design',
              'development',
              'frontend',
              'backend',
              'html',
              'css',
              'js',
              'react',
              'nodejs',
              'jquery',
              'bootstrap',
              'tailwind',
              'figma',
              'photoshop',
              'llustrator',
              'ux',
              'ui',
              'mongodb',
              'python',
              'express',
              'jwt',
            ]}
          />
        </div>
        <div className="home_block">
          <Title className="reveal">About me</Title>
          <Parapraph className="reveal home_page_paraghaph">
            <Trans>about_me.self_description</Trans>
          </Parapraph>
          <div className="home_block_about_me_links">
            <LinkButton className="reveal" to="/about">
              See more
            </LinkButton>
            <LinkButton className="reveal" to="/contact">
              Contact me
            </LinkButton>
          </div>
        </div>

        <div className="home_block">
          <Title className="reveal home_block_title">See my work</Title>
          <Parapraph className="reveal home_page_paraghaph">
            I Am a Young Profesional Web-Deweloper and UI&UX Desinger
          </Parapraph>

          <div id="home_portfolio_blocks">
            <div
              className="home_portfolio_block reveal"
              id="home_portfolio_block1"
              style={{ opacity: '0.1', cursor: 'not-allowed' }}
              onClick={handleNotificationClick1}
            >
              <div className="home_portfolio_block_title">
                Design <br />
                (UX & UI)
              </div>
            </div>
            {showNotification1 && (
              <Notification type="warning">
                Sorry, page 'Design' still in development
              </Notification>
            )}
            <Link
              to="/portfolio-front-end"
              className="home_portfolio_block reveal"
              id="home_portfolio_block2"
            >
              <div className="home_portfolio_block_title">
                Front-End <br /> Developement
              </div>
            </Link>
            <div
              className="home_portfolio_block reveal"
              id="home_portfolio_block3"
              onClick={handleNotificationClick3}
              style={{ opacity: '0.1', cursor: 'not-allowed' }}
            >
              <div className="home_portfolio_block_title">
                Back-End <br />
                Developement
              </div>
            </div>
            {showNotification3 && (
              <Notification type="warning">
                Sorry, page 'Back-end' still in development
              </Notification>
            )}
          </div>
        </div>

        <div className="home_block" style={{display:"none"}}>
          <Title className="reveal home_block_title">Meet my workplaces</Title>
          <Parapraph className="reveal home_page_paraghaph">
            As a freelance designer and web developer, I have had the privilege
            of working with a diverse range of clients, from private clients to
            established businesses. My work is driven by a commitment to
            creativity and quality, ensuring that each project results in
            exceptional, impactful solutions.
          </Parapraph>
        </div>
      </div>
      <BottomMenu />
      <Footer />
    </>
  );
}
