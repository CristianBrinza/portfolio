import React, { useEffect } from 'react';

interface DynamicMetaProps {
    title: string;
    description: string;
    keywords?: string;
}

const DynamicMeta: React.FC<DynamicMetaProps> = ({ title, description, keywords }) => {
    useEffect(() => {
        // Update the document title
        document.title = title;

        // Update the meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const newMetaDescription = document.createElement('meta');
            newMetaDescription.name = 'description';
            newMetaDescription.content = description;
            document.head.appendChild(newMetaDescription);
        }

        // Update the meta keywords (if provided)
        if (keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', keywords);
            } else {
                const newMetaKeywords = document.createElement('meta');
                newMetaKeywords.name = 'keywords';
                newMetaKeywords.content = keywords;
                document.head.appendChild(newMetaKeywords);
            }
        }

        // Clean up the changes when the component unmounts
        return () => {
            // Optionally reset the title or meta tags back to defaults if needed
        };
    }, [title, description, keywords]);

    return null; // This component doesn't render anything
};

export default DynamicMeta;
