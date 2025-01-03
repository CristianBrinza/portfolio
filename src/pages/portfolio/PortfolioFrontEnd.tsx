import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import './PortfolioFrontEnd.css';
import Footer from '../../components/Footer/Footer.tsx';
import Page from '../../components/Page.tsx';
import ShowCards from '../../components/show_card/ShowCards.tsx';
import FeedbackMenu from '../../components/FeedbackMenu/FeedbackMenu.tsx';
import PageLoading from '../../components/PageLoading/PageLoading.tsx';

interface ShowCardItem {
  title: string;
  description: string;
  link: string;
  demo?: string;
}

interface BreadcrumbItem {
  label: JSX.Element | string;
  url?: string;
}

export default function PortfolioFrontEnd() {
  const [showCardItems1, setshowCardItems1] = useState<ShowCardItem[]>([]);
  const [showCardItems2, setshowCardItems2] = useState<ShowCardItem[]>([]);
  const [showCardItems3, setshowCardItems3] = useState<ShowCardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchshowCardItems1 = async () => {
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

        // Extract only front.top section
        const frontTopItems = data?.front?.top || [];
        setshowCardItems1(frontTopItems);
      } catch (error) {
        console.error('Error fetching show card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchshowCardItems1();

    const fetchshowCardItems2 = async () => {
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
        const frontOthersItems = data?.front?.react || [];
        setshowCardItems2(frontOthersItems);
      } catch (error) {
        console.error('Error fetching show card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchshowCardItems2();

    const fetchshowCardItems3 = async () => {
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
        const frontOthersItems = data?.front?.html || [];
        setshowCardItems3(frontOthersItems);
      } catch (error) {
        console.error('Error fetching show card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchshowCardItems3();
  }, []);

  // Example breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>Portfolio</Trans>, url: '/portfolio' },
    { label: 'Front-End' },
  ];

  if (loading) {
    return <PageLoading />;
  }

  return (
    <>
      {/* Use different breadcrumbs as necessary */}
      <Breadcrumb items={breadcrumbItems} />
      <Page minHeight="80vh" gap="50px">
        <div className="main">
          <div id="portfolio_front_page_title">
            Where Creativity
            <br />
            Meets Code <br />
          </div>
        </div>

        <div id="portfolio_front_page_main">
          <ShowCards items={showCardItems1} />

          <div className="portfolio_front_page_main_title">
            React (tehnical) showcase:
          </div>
          <ShowCards desktop={4} items={showCardItems2} />
          <div className="portfolio_front_page_main_title">
            HTML, CSS & JS :
          </div>
          <ShowCards items={showCardItems3} />
        </div>
        <div id="portfolio_front_page_disclaimer">
          Projects may resemble others due to the use of open-source
          technologies. All work is either original or adapted to demonstrate my
          skills. These projects are open-source for educational purposes.
          Please ensure proper licensing and attribution are respected. For
          further inquiries, feel free to contact me.
        </div>
      </Page>
      <Footer />
      <FeedbackMenu />
    </>
  );
}
