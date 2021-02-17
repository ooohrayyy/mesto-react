import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function AddPlacePopup (props) {
  // * Стейт-переменные

  const [placeName, setPlaceName] = React.useState(''); // Имя места

  function handlePlaceNameChange (evt) {
    setPlaceName(evt.target.value);
  }

  const [placePic, setPlacePic] = React.useState(''); // Адрес иллюстрации места

  function handlePlacePicChange (evt) {
    setPlacePic(evt.target.value);
  }

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы

  const [nameValidity, setNameValidity] = React.useState(true); // Состояние валидности имени места
  const [picValidity, setPicValidity] = React.useState(true); // Состояние валидности адреса иллюстрации

  // * Функции

  function handleSubmit (evt) { // Хэндлер сабмита
    evt.preventDefault();

    props.onAddPlaceSubmit({
      name: placeName,
      link: placePic
    });

    setPlaceName('');
    setPlacePic('');

    setNameValidity(true);
    setPicValidity(true);
    setFormValidity(false);
  }

  function handleClose () { // Хэндлер закрытия
    props.onClose();

    setPlaceName('');
    setPlacePic('');

    setNameValidity(true);
    setPicValidity(true);
    setFormValidity(false);
  }

  return (
    <PopupWithForm
      formValidityState={formValidity}
      onFormValidityChange={setFormValidity}
      name="card"
      heading="Новое место"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={handleClose}
    >
      <Input
        inputModifier="popup__input_card-name"
        inputType="text"
        inputName="place"
        inputValue={placeName}
        inputPlaceholder="Название"
        inputMaxLength="30"
        inputValidityState={nameValidity}
        onInputValidityChange={setNameValidity}
        onValueChange={handlePlaceNameChange}
      />
      <Input
        inputModifier="popup__input_card-link"
        inputType="url"
        inputName="link"
        inputValue={placePic}
        inputPlaceholder="Ссылка на картинку"
        inputValidityState={picValidity}
        onInputValidityChange={setPicValidity}
        onValueChange={handlePlacePicChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;