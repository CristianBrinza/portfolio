import './BottomMenu.css';
import Button from '../Button.tsx';

const BottomMenu: React.FC = () => {
  return (
    <div className={`BottomMenu_container`}>
      <div className="BottomMenu_toggle">
        <Button
          to="work"
          color="var(--theme_primary_color_white)"
          bgcolor="var(--theme_primary_color_black)"
          border="transparent"
          hover_color="var(--theme_primary_color_black)"
        >
          Portfolio
        </Button>
        <Button
          to="/cv"
          color="var(--theme_primary_color_black)"
          border="transparent"
          hover_bgcolor="var(--theme_primary_color_dark_gray)"
          bgcolor="var(--secondary)"
        >
          CV/Resume
        </Button>
      </div>
    </div>
  );
};

export default BottomMenu;
