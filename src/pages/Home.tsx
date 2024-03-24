import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WebsiteWarning from '../components/WebiteWarning';
import '../styles/Home.css';
import BottomMenu from '../components/BottomMenu';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import {useTranslation} from "react-i18next";

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const { t, i18n: {} } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Set the --vh custom property to the innerHeight of the window
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set it on resize and orientation change
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    // Set on initial load
    setVH();

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []); // Empty dependency array ensures that effect only runs once

  return (
    <>
      <Navbar />
      <WebsiteWarning />
      <div className={`home ${isSticky ? 'sticky' : ''} page`}>

        <div className="home_hero">
          <div className="home_scroll_div">

            <div className="home_scroll">
              Scroll
            </div>
            <Icon type="arrow_to_down" stroke="var(--primary)" />

          </div>
          <BottomMenu />
        </div>
        <div className="Home_AboutMe">
          <div className="home_title">
            {t("home.short_title")}
          </div>
          <div className="Home_AboutMe_text">
            {t("home.short_t1")}
          </div>
          <div className="Home_AboutMe_text">
            {t("home.short_t2")}
          </div>

          <Button border="var(--primary)">
            {t("home.more_about_me")}
            <Icon
              type="arrow_right"
              stroke="var(--primary)"
            />
          </Button>

        </div>

        <div className="temp_home" />
      </div>
      <Footer />
    </>
  );
}
