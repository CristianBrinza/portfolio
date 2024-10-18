import React, { useState, useEffect } from 'react';
import './ShowCards.css';
import Button from '../Button.tsx';

interface ShowCardItem {
  img?: string;
  title: string;
  description?: string;
  link: string;
  demo?: string;
  more?: string;
  id?: string;
}

interface ShowCardProps {
  id?: string;
  items: ShowCardItem[];
  className?: string;
  desktop?: number; // New prop for desktop card count
  tablet?: number; // New prop for tablet card count
  mobile?: number; // New prop for mobile card count
}

const ShowCards: React.FC<ShowCardProps> = ({
  items,
  id,
  className = '',
  desktop = 8,
  tablet = 6,
  mobile = 4,
}) => {
  const [visibleCards, setVisibleCards] = useState<number>(desktop); // Default to desktop number of cards
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Update the number of visible cards based on screen width
    if (windowWidth <= 950) {
      setVisibleCards(mobile); // Use mobile prop or default
    } else if (windowWidth <= 1300) {
      setVisibleCards(tablet); // Use tablet prop or default
    } else {
      setVisibleCards(desktop); // Use desktop prop or default
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [windowWidth, desktop, tablet, mobile]); // Include prop values in the dependency array

  const showMoreCards = () => {
    setVisibleCards(items.length); // Show all remaining cards when "Show More" is clicked
  };

  return (
    <div id={id} className={`show_cards ${className}`}>
      {items.slice(0, visibleCards).map((item: ShowCardItem, index: number) => {
        return (
          <div className="show_card" id={item.id} key={index}>
            {item.img ? (
              <img src={item.img} alt="Portfolio" className="show_card_img" />
            ) : (
              <div className="show_card_img_empty"></div>
            )}
            <div className="show_card_title">{item.title}</div>

            {item.link || item.demo || item.more ? (
              <div className="show_card_btns">
                {item.link ? (
                  <>
                    <Button
                      color="var(--theme_primary_color_black)"
                      border="var(--theme_primary_color_dark_gray)"
                      bgcolor="var(--theme_primary_color_dark_gray)"
                      hover_bgcolor="var(--theme_primary_color_darkest_gray)"
                      className="show_card_btn_link"
                      to={item.link}
                    >
                      Source
                    </Button>
                  </>
                ) : null}
                {item.demo ? (
                  <>
                    <Button
                      color="#ffffff"
                      border="#1967d2"
                      bgcolor="#1967d2"
                      hover_bgcolor="#1559b7"
                      hover_color="#ffffff"
                      to={item.demo}
                      className="show_card_btn_demo"
                    >
                      Demo
                    </Button>
                  </>
                ) : null}
                {item.more ? (
                  <>
                    <Button
                      color="#ffffff"
                      border="#1967d2"
                      bgcolor="#1967d2"
                      hover_bgcolor="#1559b7"
                      hover_color="#ffffff"
                      to={item.more}
                      className="show_card_btn_demo"
                    >
                      More
                    </Button>
                  </>
                ) : null}
              </div>
            ) : (
              <div className="show_card_subtitle_hiden">{item.description}</div>
            )}

            <div className="show_card_subtitle">{item.description}</div>
          </div>
        );
      })}

      {items.length > visibleCards && (
        <Button
          color="var(--theme_primary_color_black)"
          border="var(--theme_primary_color_dark_gray)"
          bgcolor="var(--theme_primary_color_dark_gray)"
          hover_bgcolor="var(--theme_primary_color_darkest_gray)"
          className="show_more_button"
          onClick={showMoreCards}
        >
          Show More
        </Button>
      )}
    </div>
  );
};

export default ShowCards;
