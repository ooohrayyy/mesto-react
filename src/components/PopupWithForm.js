import React from 'react';

import PopupMessage from './PopupMessage.js';

function PopupWithForm (props) {
  // * Хэндлеры

  function handleChange (evt) { // Хэндлер изменения формы
    props.onFormValidityChange(evt.currentTarget.checkValidity());
  }

  function handleRefresh () { // Хэндлер кнопки перезагрузки страницы
    window.location.reload();
  }

  return (
    <div className={`popup popup-${props.name} root__popup ${props.state.open ? 'popup_opened' : ''}`}>
        <form className="popup__container" name={props.name} noValidate onChange={handleChange} onSubmit={props.onSubmit}>
          {(!props.state.loading && !props.state.failed) && (<button className="popup__close" type="button" onClick={props.onClose} />)}
          {props.state.failed && (<button className="popup__refresh" type="button" onClick={handleRefresh} />)}
          <h2
            className={`popup__heading ${(props.name === 'delete') ? 'popup__heading_delete' : ''}`}
          >
            {props.heading}
          </h2>
          {(!props.state.loading && !props.state.failed) && props.children}
          {(!props.state.loading && !props.state.failed) && (<button
            className={`popup__button ${(props.name === 'delete') ? 'popup__button_type_delete' : ''}`}
            type="submit"
            disabled={!props.formValidityState}
          >
            {(props.name === 'delete') ? 'Удалить' : 'Сохранить'}
          </button>)}
          {(props.state.loading || props.state.failed) && (<PopupMessage name={props.name} state={props.state} message={props.message} />)}
        </form>
    </div>
  );
}

export default PopupWithForm;