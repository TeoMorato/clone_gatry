import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const portalRoot = document.getElementById('portal-root');

const UIModal = ({children, isOpen, onClickClose}) => {
    if (!isOpen) {
        return null;
    }
    return ReactDOM.createPortal(
        <div className="ui-modal_overlay">
            <div className="ui-modal">
                <button type="button" className="ui-modal_close-button" onClick={onClickClose}>X</button>
                {children}
            </div>
        </div>,
        portalRoot,
    );
};
export default UIModal;