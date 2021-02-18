import React from 'react';

function PopupListener (props) {
  React.useEffect(() => {
    function checkState () { // Проверка состояния попапа
      return (!props.state.loading && !props.state.failed) ? true : false;
    }

    function handleEscClose (evt) { // Хэндлер нажатия на Esc
      if (evt.key === 'Escape' && checkState()) {
        props.onClose();
      }
    }

    function handleOverlayClose (evt) { // Хэндлер нажатия на оверлей
      if (evt.target.classList.contains('popup') && checkState()) {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('click', handleOverlayClose);
    }
  }, [props]);

  return (null);
}

export default PopupListener;