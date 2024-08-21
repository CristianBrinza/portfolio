import Navbar from '../components/Navbar/Navbar.tsx';
import BottomMenu from '../components/BottomMenu/BottomMenu.tsx';
import '../styles/Home.css';
import { Trans, useTranslation } from 'react-i18next';
import Hashtags from '../components/Hashtags/Hashtags.tsx';
import Title from '../components/Text/Title/Title.tsx';
import { useEffect, useState } from 'react';
import Parapraph from '../components/Text/Parapraph/Parapraph.tsx';
import Footer from '../components/Footer/Footer.tsx';
import LinkButton from '../components/LinkButton.tsx';
import useReveal from '../hooks/useReveal.tsx';

export default function Home() {
  useReveal();
  const { t } = useTranslation();
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
      <div className={`main ${isSticky ? 'sticky' : ''} page`}>
        <div className="home_hero">
          <svg
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
          <div>
            <span className="home_hero_text_1">
              <Trans>home.hello</Trans>
            </span>
            <br />
            <span className="home_hero_text_2">
              <Trans>home.imcristian</Trans>
            </span>
          </div>
        </div>

        <div style={{ margin: '-40px auto auto auto', maxWidth: '980px' }}>
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
          <Parapraph className="reveal">
            As a proficient Developer, I have a passion for visually appealing
            and user-friendly websites, applications and other types of
            projects. Proven my ability to deliver high-quality work, adapt to
            new technologies, collaborate with cross-functional teams, and stay
            currently with industry trends. I am a young software-engineer
            student, at the beginning of my career, having a ton of ambitious
            ideas and the motivation and discipline to realize them in
            management, design and development.
          </Parapraph>
          <div className="home_block_about_me_links">
            <LinkButton className="reveal" to="/about">
              See more
            </LinkButton>
            <LinkButton className="reveal" to="/networking">
              Networking
            </LinkButton>
          </div>
        </div>

        <div className="home_block">
          <Title className="reveal">See my work</Title>
          <Parapraph className="reveal">
            I Am a Young Profesional Web-Deweloper and UI&UX Desinger
          </Parapraph>
        </div>

        <div className="home_block">
          <Title className="reveal">Meet my workplaces</Title>
          <Parapraph className="reveal">
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
