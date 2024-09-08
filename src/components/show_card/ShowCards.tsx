import React from 'react';
import './ShowCards.css';
import Button from '../Button.tsx';

interface ShowCardItem {
  img?: string;
  title: string;
  description?: string;
  link: string;
  demo?: string;
  more?: string;
}

interface ShowCardProps {
  id?: string;
  items: ShowCardItem[];
}

const ShowCards: React.FC<ShowCardProps> = ({ items, id }) => {
  return (
    <div id={id} className="show_cards">
      {items.map((item: ShowCardItem, index: number) => {
        return (
          <div className="show_card" key={index}>
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
    </div>
  );
};

export default ShowCards;
