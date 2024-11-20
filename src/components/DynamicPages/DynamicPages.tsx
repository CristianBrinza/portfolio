import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb.tsx';
import NotFound from '../../pages/NotFound';
import { Trans } from 'react-i18next';
import Page from '../Page.tsx';
import "./DynamicPages.css"

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
                const response = await fetch(`${import.meta.env.VITE_BACKEND}/json/pages`);
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

    const getTypeUrl = (type: string | undefined): string => {
        switch (type) {
            case 'Blog':
                return '/blog';
            case 'News':
                return '/blog';
            default:
                return '/'; // Fallback to home if no type or unknown type
        }
    };

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
                                    ...(page.type
                                        ? [{ label: `${page.type} `, url: getTypeUrl(page.type) }]
                                        : []), // Conditionally include type with URL
                                    { label: page.title },
                                ]}
                            />
                            <Page gap="50px" id="dynamic_pages">
                                <div id="about_page_text" dangerouslySetInnerHTML={{__html: page.content}} />
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
