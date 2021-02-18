import React from 'react';

function Input (props) {
  const [errorMessage, setErrorMessage] = React.useState(''); // * Стейт-переменная сообщения об ошибке

  function handleChange (evt) { // * Обработчик изменения значения инпута
    props.onValueChange(evt);
    props.onInputValidityChange(evt.target.validity.valid);
    setErrorMessage(evt.target.validationMessage);
  }

  // * Возвращаемое значение

  return (
    <>
      <input
        className={`popup__input ${props.inputModifier} ${(!props.inputValidityState ? 'popup__input_invalid' : '')}`}
        type={props.inputType}
        name={props.inputName}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        minLength="2" maxLength={props.inputMaxLength}
        autoComplete="off"
        required
        onChange={handleChange}
      />
      {!props.inputValidityState && (<span className="popup__input-error">{errorMessage}</span>)}
    </>
  );
}

export default Input;