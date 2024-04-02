import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/Home.css';
import BottomMenu from '../components/BottomMenu';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import ScrollToTopLink from '../components/ScrollToTopLink';

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const {
    t,
    i18n: {},
  } = useTranslation();

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

      <div className={`home ${isSticky ? 'sticky' : ''} page`}>
        <div className="home_hero">
          <div className="home_scroll_div">
            <div className="home_scroll">Scroll</div>
            <Icon type="arrow_to_down" stroke="var(--primary)" />
          </div>
          <BottomMenu />
        </div>
        <div className="Home_AboutMe">
          <div className="home_title">{t('home.short_title')}</div>
          <div className="Home_AboutMe_text">{t('home.short_t1')}</div>
          <div className="Home_AboutMe_text">{t('home.short_t2')}</div>
          <ScrollToTopLink to={`/${t('lang')}/about`}>
            <Button border="var(--primary)">
              {t('home.more_about_me')}
              <Icon type="arrow_right" stroke="var(--primary)" />
            </Button>
          </ScrollToTopLink>
        </div>
        <div className="home_skils">
          <div className="home_skils_display">
            <div className="home_skils_display_title">
              Front-end
              Development
            </div>
            <div className="home_skils_display_showcase">
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/html.png" alt="html" />
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/css.png" alt="css" />
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/bootstrap.png" alt="bootstrap" />
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/js.png" alt="js" />
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/react.png" alt="react" />
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/typescript.png" alt="typescript" />
              </div>
            </div>
            <div className="home_skils_display_btn">
            <Button  border="var(--primary)">
              {t('home.read_more')}
              <Icon type="arrow_right" stroke="var(--primary)" />
            </Button>
            </div>
          </div>
          <div className="home_skils_display">
            <div className="home_skils_display_title">
              Back-end
              Development
            </div>
            <div className="home_skils_display_showcase">
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/js.png" alt="js"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/node.png" alt="node"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/express.png" alt="express"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/jwt.png" alt="jwt"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/python.png" alt="python"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/mongobd.png" alt="mongobd"/>
              </div>
            </div>
            <div className="home_skils_display_btn">
              <Button border="var(--primary)">
                {t('home.read_more')}
                <Icon type="arrow_right" stroke="var(--primary)"/>
              </Button>
            </div>
          </div>
          <div className="home_skils_display">
            <div className="home_skils_display_title">
              Design <br className="home_br_hide_mobile"/>Skills
            </div>
            <div className="home_skils_display_showcase">
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/figma.png" alt="figma"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/photoshop.png" alt="photoshop"/>
              </div>
              <div className="home_skils_display_showcase_block">
                <img src="images/skills/illustator.png" alt="bootstrap"/>
              </div>
            </div>
            <div className="home_skils_display_btn">
              <Button border="var(--primary)">
                {t('home.read_more')}
                <Icon type="arrow_right" stroke="var(--primary)"/>
              </Button>
            </div>
          </div>

        </div>

        <div className="home_my_work">
          <div className="home_my_work_title">
            Take a look at my work:
          </div>
        </div>

        <div className="home_contact">
          <div className="home_contact_title">
            You can find my here:
          </div>
        </div>
        <div className="temp_home" />
      </div>
      <Footer />
    </>
  );
}
