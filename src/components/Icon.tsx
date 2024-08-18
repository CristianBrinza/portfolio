import React from "react";

const Icon = ({ type, width = 24, height = 24, color = 'var(--theme_primary_color_black)', rotate="0"}) => {
    const icons = {
        close: (
            <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 17.939L17.9992 5.93972" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M6 6.06055L17.9992 18.0598" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>


            </>
        ),
        light_mode: (
            <>
                <path
                    d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                    stroke="black" strokeWidth="1.5"/>
                <path d="M12 3L12 5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 19L12 21" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M19 12H21" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 12H5" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 6.41406L19.4142 4.99985" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 19.4141L6.41421 17.9998" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M5 5L6.41421 6.41421" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M18 18L19.4142 19.4142" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>


            </>
        ),
        dark_mode:(
            <>
                <path d="M9.58199 3.45117C8.58203 9.45117 12.0821 15.4512 20.5815 14.4512" stroke={color}
                          strokeWidth="1.5" strokeLinecap="round"/>
                    <path
                        d="M9.58282 3.45117C2.08203 5.95117 2.31048 13.5304 5.58283 17.4512C9.05803 21.615 17.5828 22.4512 20.5823 14.4512"
                        stroke={color} strokeWidth="1.5" strokeLinecap="round"/>

            </>
        ),

        menu: (
            <>
                <path d="M6.5 7H17.5" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"/>
                <path d="M6.5 12H17.5" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"/>
                <path d="M6.5 17H17.5" stroke={color} strokeWidth="1.5"
                      strokeLinecap="round"/>
            </>

        ),
        back: (
            <>
                <path d="M7 11L1 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M7 1L1 6" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
            </>

        ),
        copyright: (
            <>
                <g id="Group 5221">
                    <path id="Ellipse 107"
                          d="M16.5 9C16.5 13.1421 13.1421 16.5 9 16.5C4.85786 16.5 1.5 13.1421 1.5 9C1.5 4.85786 4.85786 1.5 9 1.5C13.1421 1.5 16.5 4.85786 16.5 9Z"
                          stroke={color} stroke-width="1.5"/>
                    <path id="Ellipse 108"
                          d="M11.5892 6.645C10.949 5.94155 10.0261 5.5 9 5.5C7.067 5.5 5.5 7.067 5.5 9C5.5 10.933 7.067 12.5 9 12.5C10.1124 12.5 11.1035 11.9811 11.7446 11.1721"
                          stroke={color} stroke-width="1.5" stroke-linecap="round"/>
                </g>
            </>

        ),
        arrow: (
            <>
                <path d="M9 7L15 12" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
                <path d="M9 17L15 12" stroke={color} stroke-width="1.5" stroke-linecap="round"/>
            </>

        )


        }
    ;

    return (
        <svg
            style={{transform: `rotate(${rotate}deg)`}}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="https://www.w3.org/2000/svg"
        >
            {icons[type]}
        </svg>
    );
};

export default Icon;
