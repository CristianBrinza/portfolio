import { useEffect } from 'react';

interface MetaAndBodyManagerProps {
    themeColor: string; // Content for the meta tag
    bodyBackgroundColor: string; // Background color for the body
}

const MetaAndBodyManager: React.FC<MetaAndBodyManagerProps> = ({
                                                                               themeColor,
                                                                               bodyBackgroundColor,
                                                                           }) => {
    useEffect(() => {
        // Add or update the <meta> tag for this specific instance
        const metaTagId = 'scoped-theme-color-meta';
        let metaTag = document.querySelector(`meta[id="${metaTagId}"]`) as HTMLMetaElement;

        if (!metaTag) {
            metaTag = document.createElement('meta');
            metaTag.setAttribute('name', 'theme-color');
            metaTag.setAttribute('id', metaTagId);
            document.head.appendChild(metaTag);
        }

        metaTag.setAttribute('content', themeColor);

        // Save the previous body background color
        const previousBackgroundColor = document.body.style.backgroundColor;

        // Set the new background color
        document.body.style.backgroundColor = bodyBackgroundColor;

        // Cleanup function to restore original styles
        return () => {
            // Remove the meta tag if it matches this instance
            if (metaTag && metaTag.getAttribute('content') === themeColor) {
                document.head.removeChild(metaTag);
            }

            // Restore the previous body background color
            document.body.style.backgroundColor = previousBackgroundColor;
        };
    }, [themeColor, bodyBackgroundColor]);

    return null; // This component doesn't render anything
};

export default MetaAndBodyManager;
