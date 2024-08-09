import React from "react";

const Icon = ({ type, width = 24, height = 24, color = "#9DAEFF",}) => {
    const icons = {
        close: (
            <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 17.939L17.9992 5.93972" stroke="var(--theme_primary_color_black)" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M6 6.06055L17.9992 18.0598" stroke="var(--theme_primary_color_black)" stroke-width="1.5" stroke-linecap="round"/>
                </svg>


            </>
        ),
        mode: (
            <>
                <path
                    d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                    stroke="black" stroke-width="1.5"/>
                <path d="M12 3L12 5" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M12 19L12 21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M19 12H21" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M3 12H5" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M18 6.41406L19.4142 4.99985" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M5 19.4141L6.41421 17.9998" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M5 5L6.41421 6.41421" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M18 18L19.4142 19.4142" stroke="black" stroke-width="1.5" stroke-linecap="round"/>


            </>
        ),
        menu: (
          <>
                <path d="M6.5 7H17.5" stroke="var(--theme_primary_color_black)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.5 12H17.5" stroke="var(--theme_primary_color_black)" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M6.5 17H17.5" stroke="var(--theme_primary_color_black)" stroke-width="1.5" stroke-linecap="round"/>
          </>

        )


        }
    ;

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none"
             xmlns="http://www.w3.org/2000/svg">
            {icons[type]}
        </svg>
    );
};

export default Icon;
