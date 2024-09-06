import { Trans } from 'react-i18next';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.tsx';
import Title from '../../components/Text/Title/Title.tsx';
import "../../styles/Portfolio.css"
import Footer from "../../components/Footer/Footer.tsx";
import Page from "../../components/Page.tsx";

export default function PortfolioDesign() {
    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/' },
        { label: <Trans>navigation.portfolio_page</Trans> },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
           <Page>
               <Title><span id="portfolio_page_mini_title">My Portfolio</span> <br/>
                   Design (UI & UX)</Title>
           </Page>
            <Footer/>
        </>
    );
}
