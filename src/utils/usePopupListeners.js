import React from 'react';

function usePopupListeners (props) {
  const { open, loading, failed } = props.state;
  const { onClose } = props;

  const checkState = React.useCallback(() => {
    return (!loading && !failed) ? true : false;
  }, [loading, failed]);

  const handleEscClose = React.useCallback((evt) => {
    console.log('Нажата клавиша');
    if ((evt.key === 'Escape') && checkState()) {
      onClose();
    }
  }, [checkState, onClose]);

  const handleOverlayClose = React.useCallback((evt) => {
    console.log('Клик');
    if (evt.target.classList.contains('popup') && checkState()) {
      onClose();
    }
  }, [checkState, onClose]);

  const addEventListeners = React.useCallback(() => {
    console.log('Слушаем!');
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [handleEscClose, handleOverlayClose]);

  const removeEventListeners = React.useCallback(() => {
    console.log('Не слушаем');
    document.removeEventListener('keydown', handleEscClose);
    document.removeEventListener('click', handleOverlayClose);
  }, [handleEscClose, handleOverlayClose]);

  React.useEffect(() => {
    if (open) {
      addEventListeners();
    }

    return () => {
      if (open) {
        removeEventListeners();
      }
    }
  }, [open, addEventListeners, removeEventListeners]);
}

export default usePopupListeners;