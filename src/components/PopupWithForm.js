import React from 'react';

function PopupWithForm (props) {
  const [formValidity, setFormValidity] = React.useState(props.initialValidityState); // * Стейт-переменная валидности формы

  // * Функциии

  function handleChange (evt) { // Хэндлер изменения формы
    setFormValidity(evt.currentTarget.checkValidity());
  }

  function handleSubmit (evt) { // Хэндлер сабмита
    setFormValidity(props.initialValidityState);
    props.onSubmit(evt);
  }

  return (
    <div className={`popup popup-${props.name} root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <form className="popup__container" name={props.name} noValidate onChange={handleChange} onSubmit={handleSubmit}>
          <button className="popup__close" type="button" onClick={props.onClose} />
          <h2 className="popup__heading">{props.heading}</h2>
          {props.children}
          <button className="popup__button" type="submit" disabled={!formValidity}>
            {(props.name === 'delete') ? 'Удалить' : 'Сохранить'}
          </button>
        </form>
    </div>
  );
}

export default PopupWithForm;