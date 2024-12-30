// src/components/appback/AppBack.tsx
import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext.tsx';
import Icon from '../../../components/Icon.tsx'; // adjust path to your Icon file

const AppBack: React.FC = () => {
  const { goBack } = useActivePage();

  return (
    <button
      style={{
        color: 'var(--theme_primary_color_black)',
        position: 'absolute',
        top: '10px',
        left: '0px',
        background: 'transparent',
        border: '1px solid transparent',
        cursor: 'pointer',
        fontSize: '18px',
        display: 'flex',
        fontWeight: '500',
        alignItems: 'center',
        marginLeft: '-15px',
      }}
      onClick={goBack}
    >
      {/* If "arrow_left" isn't in your icons object,
          either add it or use another icon like "back" or "arrow". */}
      <Icon type="back" size="28px" color="var(--theme_primary_color_black)" />
      <span style={{ marginLeft: '-2px' }}>Back</span>
    </button>
  );
};

export default AppBack;
