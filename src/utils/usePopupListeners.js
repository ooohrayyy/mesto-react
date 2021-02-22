import React from 'react';

function usePopupListeners (props) {
  const {
    state: { open, loading, failed },
    onClose
  } = props;

  const popupIsReady = (!loading && !failed);

  const handleEscClose = React.useCallback((evt) => {
    if ((evt.key === 'Escape') && popupIsReady) {
      onClose();
    }
  }, [popupIsReady, onClose]);

  const handleOverlayClose = React.useCallback((evt) => {
    if (evt.target.classList.contains('popup') && popupIsReady) {
      onClose();
    }
  }, [popupIsReady, onClose]);

  const addEventListeners = React.useCallback(() => {
    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('click', handleOverlayClose);
  }, [handleEscClose, handleOverlayClose]);

  const removeEventListeners = React.useCallback(() => {
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