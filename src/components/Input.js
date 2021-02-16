import React from 'react';

function Input (props) {
  const inputRef = React.useRef(); // * Реф инпута

  const [isValid, setIsValid] = React.useState(true); // * Стейт-переменная валидности

  // * Функции

  function validateInput () { // Валидация инпута
    if (inputRef.current.validity.valid) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  function handleChange (evt) { // Хэндлер изменения
    props.onChange(evt);
    validateInput();
  }

  return (
    <>
      <input
        ref={inputRef}
        className={`popup__input ${props.inputModifier} ${(!isValid && ('popup__input_invalid'))}`}
        type={props.inputType}
        name={props.inputName}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        minLength="2" maxLength={props.inputMaxLength}
        autoComplete="off"
        required
        onChange={handleChange}
      />
      {!isValid && (<span className="popup__error popup__error_active">{inputRef.current.validationMessage}</span>)}
    </>
  );
}

export default Input;