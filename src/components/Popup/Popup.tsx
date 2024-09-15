import React, { useEffect, useRef } from 'react';
import './Popup.css';
import Icon from '../Icon.tsx';

interface PopupProps {
  id: string;
  width?: string;
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({
  id,
  children,
  isVisible,
  onClose,
  width = '600px',
}) => {
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Handle alignment based on height of the content
  useEffect(() => {
    if (isVisible && popupRef.current) {
      const popupInside = popupRef.current.querySelector(
        '.popup_block_inside'
      ) as HTMLDivElement;

      if (popupInside) {
        // Check if popup_block_inside height is greater than 90vh
        if (popupInside.offsetHeight > window.innerHeight * 0.9) {
          // Add align-items: flex-start to popup_block
          popupRef.current.style.alignItems = 'flex-start';
        } else {
          // Center the popup if it's smaller than 90vh
          popupRef.current.style.alignItems = 'center';
        }
      }
    }
  }, [isVisible]);

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup_block ${isVisible ? 'show' : ''}`}
      id={`popup_block_${id}`}
      style={{ display: isVisible ? 'flex' : 'none' }}
      onClick={handleOutsideClick}
      ref={popupRef}
    >
      <div className="popup_block_inside" style={{ maxWidth: width }}>
        <div className="popup_close_button" onClick={onClose}>
          <Icon type="close" color="#1D1D1F" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Popup;
