import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import './PortfolioFrontEnd.css';
import Footer from '../../components/Footer/Footer.tsx';
import Page from '../../components/Page.tsx';
import ShowCards from '../../components/show_card/ShowCards.tsx';

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchshowCardItems1 = async () => {
      try {
        const response = await fetch('/json/portfolio.json');
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
        const response = await fetch('/json/portfolio.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const frontOthersItems = data?.front?.others || [];
        setshowCardItems2(frontOthersItems);
      } catch (error) {
        console.error('Error fetching show card data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchshowCardItems2();
  }, []);

  // Example breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>Portfolio</Trans>, url: '/portfolio' },
    { label: 'Front-End' },
  ];

  if (loading) {
    return <div>Loading...</div>;
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
          <div className="portfolio_front_page_main_title">Other Pojects:</div>
          <ShowCards items={showCardItems2} />
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
    </>
  );
}
