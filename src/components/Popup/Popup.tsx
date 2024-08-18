import React from "react";
import "./Popup.css";
import Icon from "../Icon.tsx";

interface PopupProps {
    id: string;

    children: React.ReactNode;
    isVisible: boolean;
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ id, children, isVisible, onClose }) => {
    return (
        <div className={`popup_block ${isVisible ? 'show' : ''}`} id={`popup_block_${id}`} style={{ display: isVisible ? 'flex' : 'none' }}>
            <div className="popup_block_inside">
                <div className="popup_close_button" onClick={onClose}>
                   <Icon type="close" color="#1D1D1F"/>

                </div>


                {children}
            </div>
        </div>
    );
};

export default Popup;
