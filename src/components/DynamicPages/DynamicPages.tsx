import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb.tsx';
import NotFound from '../../pages/NotFound';
import { Trans } from 'react-i18next';
import Page from '../Page.tsx';

interface Page {
    link: string;
    content: string;
    title: string;
    type?: string; // Optional since not all pages might have a type
}

const DynamicPages: React.FC = () => {
    const [dynamicPages, setDynamicPages] = useState<Page[]>([]);

    useEffect(() => {
        // Fetch the pages.json file from the public folder
        const fetchPages = async () => {
            try {
                const response = await fetch('/json/pages.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setDynamicPages(data);
            } catch (error) {
                console.error('Failed to load pages.json:', error);
            }
        };

        fetchPages();
    }, []);

    return (
        <Routes>
            {dynamicPages.map((page) => (
                <Route
                    key={page.link}
                    path={`/:lang/${page.link}`}
                    element={
                        <>
                            <Breadcrumb
                                items={[
                                    { label: <Trans>navigation.home</Trans>, url: '/' },
                                    ...(page.type ? [{ label: `${page.type} / ` }] : []), // Conditionally include 'aaa' if page.type exists
                                    { label: page.title },
                                ]}
                            />
                            <Page gap="50px" id="dynamic_pages_page">
                                <div dangerouslySetInnerHTML={{ __html: page.content }} />
                            </Page>
                            <Footer />
                        </>
                    }
                />
            ))}
            {/* Fallback route to NotFound if no page is matched */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default DynamicPages;
