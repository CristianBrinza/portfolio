import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import '../styles/WebsiteWarning.css';

const WebsiteWarning: React.FC = () => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (visible) {
            timeout = setTimeout(() => {
                setVisible(false);
            }, 10000);
        }

        return () => clearTimeout(timeout);
    }, [visible]);

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <>
            {visible && (
                <div className={`WebsiteWarning ${visible ? '' : 'fadeOut'}`}>
                    <div className="WebsiteWarning_close" onClick={handleClose}>
                        <Icon type="close" />
                    </div>
                    <div className="WebsiteWarning_text">
                        website under development
                        <br />
                        <span className="WebsiteWarning_text_gray">
              Mind the bugs and the changes
            </span>
                    </div>
                    {/* Fill div */}
                    <div className="WebsiteWarning_fill"></div>
                </div>
            )}
        </>
    );
};

export default WebsiteWarning;
