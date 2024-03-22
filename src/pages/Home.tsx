import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WebsiteWarning from '../components/WebiteWarning';
import '../styles/Home.css';
import BottomMenu from '../components/BottomMenu';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Footer from '../components/Footer';

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="23"
              viewBox="0 0 20 23"
              fill="none"
            >
              <path
                d="M9.99993 22L0.999863 12.9999M9.99993 22L19 12.9999M9.99993 22L9.99993 0.999838"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

          </div>
          <BottomMenu />
        </div>
        <div className="Home_AboutMe">
          <div className="home_title">
            Very very short about me:
          </div>
          <div className="Home_AboutMe_text">
            As a proficient Developer, I have a passion for visually appealing and user-friendly
            websites, applications and other types of projects. Proven my ability to deliver
            high-quality work, adapt to new technologies, collaborate with cross-functional
            teams, and stay currently with industry trends.
          </div>
          <div className="Home_AboutMe_text">
            I am a young software-engineer student, at the beginning of my career, having a ton of ambitious ideas and the motivation and discipline to realize them in management, design and development.
            {' '}
          </div>

          <Button border="--primary">
            More about me
            <Icon
              type="arrow_right"
            />
          </Button>

        </div>

        <div className="temp_home" />
      </div>
      <Footer />
    </>
  );
}
