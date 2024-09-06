import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../../components/Text/Title/Title.tsx';
import "../../styles/Portfolio.css"
import Footer from "../../components/Footer/Footer.tsx";
import Page from "../../components/Page.tsx";
import LinkButton from "../../components/LinkButton.tsx";
export default function Portfolio() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.portfolio_page</Trans> },
  ];

  return (
    <>
        <Breadcrumb items={breadcrumbItems} />
     <Page minHeight="80vh" gap="50px">
            <div className="main">
                <div style={{display:"none"}} id="portfolio_page_title_small">
                    Wecome to my Portfolio
                </div>
              <div id="portfolio_page_title">
                  Build. <br/>
                  Contribute. <br/>
                  Evolve. <br/>
              </div>
            </div>

         <div id="portfolio_page_main">
             <div className="portfolio_page_cards">

                 <div className="portfolio_page_cards_title">
                     Design <br/>
                     (UX & UI)

                     <br/>
                     <div    className="portfolio_page_cards_title_mini">
                          Exceptional Experiences, One Pixel at a Time
                     </div>
                 </div>
                 <img className="portfolio_page_cards_img" src="/images/portfolio_1.png" alt="Portfolio"/>
                 <LinkButton className="portfolio_page_cards_see_more" to="/portfolio-design">
                     See more
                 </LinkButton>
             </div>
             <div className="portfolio_page_cards">

                 <div className="portfolio_page_cards_title">
                     Front-End <br/>
                     Developement
                     <br/>
                     <div className="portfolio_page_cards_title_mini">
                         Where Creativity Meets Code in the World of Frontend
                     </div>
                 </div>
                 <img className="portfolio_page_cards_img" src="/images/portfolio_2.png" alt="Portfolio"/>
                 <LinkButton className="portfolio_page_cards_see_more" to="/portfolio-back-end">
                     See more
                 </LinkButton>
             </div>
             <div className="portfolio_page_cards">

                 <div className="portfolio_page_cards_title">
                     Back-End <br/>
                     Developement
                     <br/>
                     <div className="portfolio_page_cards_title_mini">
                         Building the Engines that Power the Web

                     </div>
                 </div>
                 <img className="portfolio_page_cards_img" src="/images/portfolio_3.png" alt="Portfolio"/>
                 <LinkButton className="portfolio_page_cards_see_more" to="/portfolio-front-end">
                     See more
                 </LinkButton>
             </div>
         </div>
         <div id="portfolio_page_disclamer">
             Projects may resemble others due to the use of open-source technologies. All work is either original or adapted to demonstrate my skills. These projects are open-source for educational purposes. Please ensure proper licensing and attribution are respected. For further inquiries, feel free to contact me.
         </div>
     </Page>
        <Footer/>
    </>
  );
}
