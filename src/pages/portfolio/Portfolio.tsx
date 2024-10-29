import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Page from '../../components/Page.tsx';
import LinkButton from '../../components/LinkButton.tsx';
import Notification from '../../components/Notification/Notification.tsx';
import { useState } from 'react';
import styles from './Portfolio.module.css';
import FeedbackMenu from "../../components/FeedbackMenu/FeedbackMenu.tsx"; // Importing CSS Module

export default function Portfolio() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.portfolio_page</Trans> },
  ];

  const [showNotification1, setShowNotification1] = useState(false); // For home_portfolio_block2
  const [showNotification3, setShowNotification3] = useState(false); // For home_portfolio_block3

  const handleNotificationClick1 = () => {
    setShowNotification1(true); // Show notification for block 2
    setTimeout(() => {
      setShowNotification1(false); // Hide notification after 10 seconds
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
      <Breadcrumb items={breadcrumbItems} />
      <Page minHeight="80vh" gap="50px">
        <div className={styles.main}>
          <div style={{ display: 'none' }} id="portfolio_page_title_small">
            Welcome to my Portfolio
          </div>
          <div id={styles.portfolio_page_title}>
            Build. <br />
            Contribute. <br />
            Evolve. <br />
          </div>
        </div>

        <div id={styles.portfolio_page_main}>
          <div
            className={styles.portfolio_page_cards}
            onClick={handleNotificationClick1}
          >
            <div className={styles.portfolio_page_cards_title}>
              Design <br />
              (UX & UI)
              <br />
              <div className={styles.portfolio_page_cards_title_mini}>
                Exceptional Experiences, One Pixel at a Time
              </div>
            </div>
            <img
              className={styles.portfolio_page_cards_img}
              src="/images/portfolio_1.png"
              alt="Portfolio"
            />
            <LinkButton className={styles.portfolio_page_cards_see_more} to="">
              See more
            </LinkButton>
            {showNotification1 && (
              <Notification type="warning">
                Sorry, page 'Design' still in development
              </Notification>
            )}
          </div>
          <div className={styles.portfolio_page_cards}>
            <div className={styles.portfolio_page_cards_title}>
              Front-End <br />
              Development
              <br />
              <div className={styles.portfolio_page_cards_title_mini}>
                Where Creativity Meets Code in the World of Frontend
              </div>
            </div>
            <img
              className={styles.portfolio_page_cards_img}
              src="/images/portfolio_2.png"
              alt="Portfolio"
            />
            <LinkButton
              className={styles.portfolio_page_cards_see_more}
              to="/portfolio-front-end"
            >
              See more
            </LinkButton>
          </div>
          <div
            className={styles.portfolio_page_cards}
            onClick={handleNotificationClick3}
          >
            <div className={styles.portfolio_page_cards_title}>
              Back-End <br />
              Development
              <br />
              <div className={styles.portfolio_page_cards_title_mini}>
                Building the Engines that Power the Web
              </div>
            </div>
            <img
              className={styles.portfolio_page_cards_img}
              src="/images/portfolio_3.png"
              alt="Portfolio"
            />
            <LinkButton className={styles.portfolio_page_cards_see_more} to="">
              See more
            </LinkButton>
            {showNotification3 && (
              <Notification type="warning">
                Sorry, page 'Back-end' still in development
              </Notification>
            )}
          </div>
        </div>
        <div id={styles.portfolio_page_disclamer}>
          Projects may resemble others due to the use of open-source
          technologies. All work is either original or adapted to demonstrate my
          skills. These projects are open-source for educational purposes.
          Please ensure proper licensing and attribution are respected. For
          further inquiries, feel free to contact me.
        </div>
      </Page>
      <Footer />
      <FeedbackMenu/>
    </>
  );
}
