import React, { useEffect, useState } from 'react';
import { Trans } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.tsx";
import Page from "../../components/Page.tsx";
import Title from "../../components/Text/Title/Title.tsx";
import Parapraph from "../../components/Text/Parapraph/Parapraph.tsx";
import styles from "./Certifications.module.css";
import Footer from "../../components/Footer/Footer.tsx";
import FeedbackMenu from "../../components/FeedbackMenu/FeedbackMenu.tsx";

interface CertificationsItem {
    to: string;
    img: string;
    title: string;
    by: string;
    description: string;
}

const Certifications: React.FC = () => {
    const [showCardItems, setShowCardItems] = useState<CertificationsItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchShowCardItems = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND}/json/certifications`, {
                    headers: {
                        'ngrok-skip-browser-warning': 'true'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const certificationsItems = data || [];
                setShowCardItems(certificationsItems);
            } catch (error) {
                console.error('Error fetching show card data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShowCardItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/' },
        { label: 'Certifications & Courses' },
    ];

    const handleCardClick = (to: string | undefined) => {
        if (to) {
            if (/^(http|https):\/\//.test(to)) {
                // External link
                window.open(to, '_blank', 'noopener,noreferrer');
            } else {
                // Internal link
                navigate(to);
            }
        }
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <Page minHeight="80vh">
                <div>
                    <Title style={{ marginTop: '20px' }}>Certifications & Courses</Title>
                    <Parapraph style={{ marginBottom: '20px' }}>
                        Welcome to the Certifications & Courses section! Explore my learning journey as I continuously expand my knowledge and skills through various certifications and courses. From design principles to technical expertise, each course reflects a commitment to growth and staying ahead in the ever-evolving world of technology and design. Dive in to see how each certification adds value to my professional path!
                    </Parapraph>

                    <div className={styles.certification_block}>
                        {showCardItems.map((item, index) => (
                            <div
                                key={index}
                                className={`${styles.certification_card} ${item.to ? styles.certification_card_pointer : styles.certification_card_not_allowed}`}
                                onClick={() => handleCardClick(item.to)}
                            >
                                <img src={item.img} alt="certifications" className={styles.certification_img}/>
                                <b className={styles.certification_title}>{item.title}</b>
                                <p className={styles.certification_by}>{item.by}</p>
                                <p className={styles.certification_description}>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Page>
            <Footer/>
            <FeedbackMenu/>
        </>
    );
};

export default Certifications;
