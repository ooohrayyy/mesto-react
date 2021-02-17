import React from 'react';

function Input (props) {
  const inputRef = React.useRef(); // * Реф инпута

  // * Функции

  function handleChange (evt) { // Хэндлер изменения
    props.onValueChange(evt);
    props.onInputValidityChange(evt.target.validity.valid);
  }

  return (
    <>
      <input
        ref={inputRef}
        className={`popup__input ${props.inputModifier} ${(!props.formIsValid && (!props.inputValidityState && ('popup__input_invalid')))}`}
        type={props.inputType}
        name={props.inputName}
        value={props.inputValue}
        placeholder={props.inputPlaceholder}
        minLength="2" maxLength={props.inputMaxLength}
        autoComplete="off"
        required
        onChange={handleChange}
      />
      {!props.formIsValid &&
      (!props.inputValidityState &&
      (<span className="popup__error popup__error_active">
        {inputRef.current && inputRef.current.validationMessage}
      </span>)
      )}
    </>
  );
}

export default Input;