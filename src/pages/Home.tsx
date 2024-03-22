import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import WebsiteWarning from '../components/WebiteWarning';
import '../styles/Home.css';
import BottomMenu from '../components/BottomMenu';

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100 * window.innerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures that effect only runs once

  return (
    <div className={`home ${isSticky ? 'sticky' : ''}`}>
      <Navbar />
      <WebsiteWarning />
      <div className="home_hero">
        <BottomMenu />
      </div>
    </div>
  );
}
