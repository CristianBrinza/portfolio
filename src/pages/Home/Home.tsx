import BottomMenu from '../../components/BottomMenu/BottomMenu.tsx';
import styles from './Home.module.css'; // Importing the CSS module
import Hashtags from '../../components/Hashtags/Hashtags.tsx';
import Title from '../../components/Text/Title/Title.tsx';
import { useEffect, useState } from 'react';
import Parapraph from '../../components/Text/Parapraph/Parapraph.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import LinkButton from '../../components/LinkButton.tsx';
import useReveal from '../../hooks/useReveal.tsx';
import { Trans, useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import ShowCards from '../../components/show_card/ShowCards.tsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Page from '../../components/Page.tsx';
import FeedbackMenu from '../../components/FeedbackMenu/FeedbackMenu.tsx';
import Button from '../../components/Button.tsx';
import Icon from '../../components/Icon.tsx';
import Navbar from '../../components/Navbar/Navbar.tsx';

interface ShowCardItem {
  title: string;
  description: string;
  link: string;
  demo?: string;
}

export default function Home() {
  const { t } = useTranslation(); // Get the t function from useTranslation
  const { language } = useLanguage(); // Get the current language from the context

  const [isSticky, setIsSticky] = useState(false);

  useReveal(); // Assuming this hook is for reveal animations

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

    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    window.addEventListener('scroll', handleScroll);

    setVH();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  useEffect(() => {}, [language]);

  useEffect(() => {
    const adjustHeroHeight = () => {
      const topNotification = document.getElementById('top_notification');
      const topNotificationHeight = topNotification
        ? topNotification.offsetHeight
        : 0;
      const heroHeight = topNotification
        ? window.innerHeight - topNotificationHeight
        : window.innerHeight;

      document.documentElement.style.setProperty(
        '--hero-height',
        `${heroHeight - 4}px`
      );

      const marginTop = topNotification ? '-4px' : '0px';
      document.documentElement.style.setProperty(
        '--hero-margin-top',
        marginTop
      );
    };

    adjustHeroHeight();
    window.addEventListener('resize', adjustHeroHeight);

    return () => {
      window.removeEventListener('resize', adjustHeroHeight);
    };
  }, []);

  const [showCardItems, setshowCardItems] = useState<ShowCardItem[]>([]);

  useEffect(() => {
    const fetchshowCardItems = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND}/json/portfolio`,
          {
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const frontTopItems = data?.home || [];
        setshowCardItems(frontTopItems);
      } catch (error) {
        console.error('Error fetching show card data:', error);
      }
    };

    fetchshowCardItems();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 951,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 651,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div
        className={`${styles.home_hero_new} ${isSticky ? styles.sticky : ''}`}
      >
        <Navbar />
        <div className={`main page`}>
          <div className={styles.home_hero}>
            <div className={styles.home_hero_about}>
              Designer <br />
              Full-Stack Developer
            </div>
            <svg
              className={styles.home_hero_svg}
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
            <div className={styles.home_hero_text}>
              <span className={styles.home_hero_text_1}>{t('home.hello')}</span>
              <br />
              <span className={styles.home_hero_text_2}>
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
              'illustrator',
              'ux',
              'ui',
              'mongodb',
              'python',
              'express',
              'jwt',
            ]}
          />
        </div>
        <div className={styles.home_block}>
          <Title className="reveal">About me</Title>
          <Parapraph className={`reveal ${styles.home_page_paraghaph}`}>
            <Trans>about_me.self_description</Trans>
          </Parapraph>
          <div className={`reveal ${styles.home_block_about_me_links}`}>
            <LinkButton to="/about">See more</LinkButton>
            <LinkButton to="/contact">Contact me</LinkButton>
          </div>
        </div>

        <div id={styles.home_portfolio_block} style={{ display: 'none' }}>
          <Page minHeight={'100px'}>
            ddd <br />
            ddd <br />
            ddd <br />
            ddd <br />
          </Page>
        </div>

        <div className={styles.home_block}>
          <Title className={`reveal ${styles.home_block_title}`}>
            Top Projects
          </Title>
          <Parapraph className={`reveal ${styles.home_page_paraghaph}`}>
            Check out some of my favorite projects! They highlight my love for
            creating user-friendly and visually engaging web experiences.
          </Parapraph>

          <div className="reveal" id="home_portfolio_block_top_projects">
            <ShowCards items={showCardItems} className="show_cards_home" />
          </div>
        </div>

        <div className={`${styles.home_block_links} ${styles.home_block}`}>
          <Title className={`reveal ${styles.home_block_title_links}`}>
            Useful links
          </Title>

          <div className={`reveal ${styles.home_block_links_btns}`}>
            <Button
              to="https://github.com/CristianBrinza/portfolio"
              className={styles.home_block_links_btn}
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              hover_bgcolor="var(--theme_primary_color_darkest_gray)"
            >
              Portfolio source code
              <Icon
                size="28px"
                className={styles.home_block_links_btn_icon}
                type="arrow_right"
              />
            </Button>
            <Button
              to="/certifications"
              className={styles.home_block_links_btn}
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              hover_bgcolor="var(--theme_primary_color_darkest_gray)"
            >
              Certifications & Courses
              <Icon
                size="28px"
                className={styles.home_block_links_btn_icon}
                type="arrow_right"
              />
            </Button>
            <Button
              to="/icons-showcase"
              className={styles.home_block_links_btn}
              bgcolor="var(--theme_primary_color_dark_gray)"
              border="var(--theme_primary_color_dark_gray)"
              hover_bgcolor="var(--theme_primary_color_darkest_gray)"
            >
              Icons Showcase
              <Icon
                size="28px"
                className={styles.home_block_links_btn_icon}
                type="arrow_right"
              />
            </Button>
            {/*<Button*/}
            {/*    className={styles.home_block_links_btn}*/}
            {/*    bgcolor="var(--theme_primary_color_dark_gray)"*/}
            {/*    border="var(--theme_primary_color_dark_gray)"*/}
            {/*    hover_bgcolor="var(--theme_primary_color_darkest_gray)"*/}
            {/*>*/}
            {/*  My stack*/}
            {/*  <Icon*/}
            {/*      size="28px"*/}
            {/*      className={styles.home_block_links_btn_icon}*/}
            {/*      type="arrow_right"*/}
            {/*  />*/}
            {/*</Button>*/}
          </div>
        </div>

        <div className={styles.home_block} style={{ display: 'none' }}>
          <div className={`reveal ${styles.home_block_work}`}>
            <Title className={`reveal ${styles.home_block_title}`}>
              Meet my workplaces
            </Title>
          </div>
        </div>
        <div style={{ marginTop: '-60px', display: 'none' }}>
          <Slider {...settings}>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>
                <img
                  style={{ width: '100%' }}
                  src="/images/workplaces/secret.png"
                  alt="work"
                />
              </div>
            </div>
          </Slider>
        </div>
      </div>

      <BottomMenu />
      <Footer className={styles.home_footer} />
      <FeedbackMenu />

      <div className={styles.home_loader} style={{ display: 'none' }}></div>
    </>
  );
}
