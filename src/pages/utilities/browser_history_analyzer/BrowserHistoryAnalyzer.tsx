import Title from '../../../components/Text/Title/Title.tsx';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb.tsx';
import Page from '../../../components/Page.tsx';
import Footer from '../../../components/Footer/Footer.tsx';
import Button from '../../../components/Button.tsx';
import Icon from '../../../components/Icon.tsx';
import './BrowserHistoryAnalyzer.css';

export default function BrowserHistoryAnalyzer() {

    const analyzeHistory = () => {
    };

    const handleCopy = () => {
    };

    return (
        <>
            <Breadcrumb
                items={[
                    { label: 'Home', url: '/' },
                    {
                        label: 'Utilities',
                        url: '/utilities',
                    },
                    { label: 'Browser History Analyzer' },
                ]}
            />
            <Page gap="20px">
                <Title>Browser History Analyzer</Title>

                <div className="analyzer_container">
                    <Button
                        color="var(--theme_primary_color_white)"
                        bgcolor="var(--theme_primary_color_black)"
                        border="var(--theme_primary_color_black)"
                        onClick={analyzeHistory}
                    >
                        Analyze History
                    </Button>
                </div>

                { (
                    <div className="analysis_result">

                        <Button
                            color="var(--theme_primary_color_black)"
                            border="var(--theme_primary_color_black)"
                            onClick={handleCopy}
                        >
                            Copy Results
                            <Icon color="var(--theme_primary_color_black)" type="copy" />
                        </Button>
                        {  (
                            <span
                                style={{
                                    marginLeft: '10px',
                                    color: '#4DD181',
                                    fontWeight: 400,
                                }}
                            >
                                Copied
                            </span>
                        )}
                    </div>
                )}


            </Page>
            <Footer />
        </>
    );
}
