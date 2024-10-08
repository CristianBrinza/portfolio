import Navbar from '../components/Navbar/Navbar.tsx';
import BottomMenu from '../components/BottomMenu/BottomMenu.tsx';
import styles from '../styles/Home.module.css'; // Importing the CSS module
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
import ShowCards from '../components/show_card/ShowCards.tsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Icon from '../components/Icon.tsx';

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

  const [showNotification1, setShowNotification2] = useState(false); // For home_portfolio_block2
  const [showNotification3, setShowNotification3] = useState(false); // For home_portfolio_block3

  const handleNotificationClick1 = () => {
    setShowNotification2(true);
    setTimeout(() => {
      setShowNotification2(false);
    }, 10000);
  };

  const handleNotificationClick3 = () => {
    setShowNotification3(true);
    setTimeout(() => {
      setShowNotification3(false);
    }, 10000);
  };

  const [showCardItems, setshowCardItems] = useState<ShowCardItem[]>([]);

  useEffect(() => {
    const fetchshowCardItems = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_PORTFOLIO_DATA);
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
          <div className={styles.home_block_about_me_links}>
            <LinkButton className="reveal" to="/about">
              See more
            </LinkButton>
            <LinkButton className="reveal" to="/contact">
              Contact me
            </LinkButton>
          </div>
        </div>

        <div className={styles.home_block}>
          <Title className={`reveal ${styles.home_block_title}`}>
            See my work
          </Title>
          <Parapraph className={`reveal ${styles.home_page_paraghaph}`}>
            I Am a Young Professional Web Developer and UI&UX Designer
          </Parapraph>

          <div id={styles.home_portfolio_blocks}>
            <div
              className={`${styles.home_portfolio_block} reveal`}
              id={styles.home_portfolio_block1}
              style={{ opacity: '0.5', cursor: 'not-allowed' }}
              onClick={handleNotificationClick1}
            >
              <div className={styles.home_portfolio_block_title}>
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
              className={`${styles.home_portfolio_block} reveal`}
              id={styles.home_portfolio_block2}
            >
              <div className={styles.home_portfolio_block_title}>
                Front-End <br /> Development
              </div>
            </Link>
            <div
              className={`${styles.home_portfolio_block} reveal`}
              id={styles.home_portfolio_block3}
              onClick={handleNotificationClick3}
              style={{ opacity: '0.5', cursor: 'not-allowed' }}
            >
              <div className={styles.home_portfolio_block_title}>
                Back-End <br />
                Development
              </div>
            </div>
            {showNotification3 && (
              <Notification type="warning">
                Sorry, page 'Back-end' still in development
              </Notification>
            )}
          </div>
        </div>
        <div className={styles.home_block} style={{ display: 'none' }}>
          <Title className={`reveal ${styles.home_block_title}`}>
            My Stack
          </Title>
          <Parapraph className={`reveal ${styles.home_page_paraghaph}`}>
            My toolkit blends modern tech and design to create seamless,
            user-friendly digital experiences.
          </Parapraph>

          <div className={styles.home_block_stack_show}>
            <div className={styles.home_block_stack_show_block}>
              <div className={styles.home_block_stack_show_block_title}>
                Design
              </div>
              <div className={styles.home_block_stack_show_block_svgs}>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="figma" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="photoshop" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="illustrator" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="premier" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="after_effect" />
                </div>
              </div>
            </div>
            <div className={styles.home_block_stack_show_block}>
              <div className={styles.home_block_stack_show_block_title}>
                Front-end
              </div>
              <div className={styles.home_block_stack_show_block_svgs}>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="react" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="vite" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="bootstrap" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="mondodb" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="npm" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="yarn" />
                </div>
              </div>
            </div>
            <div className={styles.home_block_stack_show_block}>
              <div className={styles.home_block_stack_show_block_title}>
                Back-end
              </div>
              <div className={styles.home_block_stack_show_block_svgs}>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="nodejs" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="express" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="javascript" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="git" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="jwt" />
                </div>
                <div className={styles.home_block_stack_show_block_svg}>
                  <Icon size="32px" type="python" />
                </div>
              </div>
            </div>
          </div>
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

        <div className={styles.home_block}>
          <Title className={`reveal ${styles.home_block_title}`}>
            Meet my workplaces
          </Title>
          <Parapraph className={`reveal ${styles.home_page_paraghaph}`}>
            As a freelance designer and web developer, I have had the privilege
            of working with a diverse range of clients, from private clients to
            established businesses. My work is driven by a commitment to
            creativity and quality, ensuring that each project results in
            exceptional, impactful solutions.
          </Parapraph>
        </div>
        <div style={{ marginTop: '-60px' }}>
          <Slider {...settings}>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
            <div>
              <div className={styles.home_my_work_block}>hiden</div>
            </div>
          </Slider>
        </div>
      </div>

      <BottomMenu />
      <Footer />
    </>
  );
}
