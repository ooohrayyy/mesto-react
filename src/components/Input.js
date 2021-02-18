import React from 'react';

function Input (props) {
  const inputRef = React.useRef(); // * Реф инпута

  function handleChange (evt) { // * Обработчик изменения значения инпута
    props.onValueChange(evt);
    props.onInputValidityChange(evt.target.validity.valid);
  }

  // * Возвращаемое значение

  return (
    <>
      <input
        ref={inputRef}
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
      {!props.inputValidityState &&
      (<span className="popup__input-error">
        {inputRef.current && inputRef.current.validationMessage}
      </span>)
      }
    </>
  );
}

export default Input;