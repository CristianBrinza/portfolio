import React from 'react';
import Icon from "./Icon.tsx";


interface LinkButtonProps {
    to?: string;
    color?: string;
    children: React.ReactNode;
}

const LinkButton: React.FC<LinkButtonProps> = ({
                                                 color,
                                                 children,
    to
                                             }) => {


    const LinkButtonStyle: React.CSSProperties = {
        color: color || '#1967D2',
        fontFamily: 'Inter',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '18px',
        display: 'flex',
        alignItems: 'center',
        gap:'5px',
        textDecoration:"none",
        cursor:"pointer"


    };

    return (
        <a href={to}
            style={LinkButtonStyle}
        >
            {children}
            <Icon type="arrow" color={color || '#1967D2'}/>
        </a>
    );
};

export default LinkButton;
