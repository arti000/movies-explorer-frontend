import React from 'react';
import './InfoToolTip.css';

function InfoTooltip({ isOpen, onClose, authStatusMessage }) {

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <article className={`popup ${isOpen && 'popup_opened'}`} onMouseDown={handleMouseDown}>
      <div className='popup__container'>
        <button
          className='popup__close'
          aria-label='Закрыть окно'
          type='button'
          onClick={onClose}
        ></button>
        <div className='popup__content'>
          <h1 className='popup__message'>{ authStatusMessage }</h1>
        </div>
      </div>
    </article>
  );
}

export default InfoTooltip;
