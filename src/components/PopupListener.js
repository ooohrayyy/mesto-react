import React from 'react';

function PopupListener (props) {
  React.useEffect(() => {
    function handleEscClose (evt) {
      if (props.state) {
        if (evt.key === 'Escape' && !props.state.loading && !props.state.failed) {
          props.onClose();
        }
      } else {
        props.onClose();
      }
    }

    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [props]);

  return (null);
}

export default PopupListener;