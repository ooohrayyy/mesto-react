import React from 'react';

function PopupWithForm (props) {
  // * Функциии

  function handleChange (evt) { // Хэндлер изменения формы
    props.onValidityChange(evt.currentTarget.checkValidity());
  }

  const formValidity = props.validityState;

  return (
    <div className={`popup popup-${props.name} root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <form className="popup__container" name={props.name} noValidate onChange={handleChange} onSubmit={props.onSubmit}>
          <button className="popup__close" type="button" onClick={props.onClose} />
          <h2 className={`popup__heading ${(props.name === 'delete') && 'popup__heading_delete'}`}>{props.heading}</h2>
          {props.children}
          <button className={`popup__button ${(props.name === 'delete') && 'popup__button_type_delete'}`} type="submit" disabled={!formValidity}>
            {(props.name === 'delete') ? 'Удалить' : 'Сохранить'}
          </button>
        </form>
    </div>
  );
}

export default PopupWithForm;