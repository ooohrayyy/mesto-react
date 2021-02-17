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

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности

  // * Функции

  function handleSubmit (evt) { // Хэндлер сабмита
    evt.preventDefault();

    props.onAddPlaceSubmit({
      name: placeName,
      link: placePic
    });

    setPlaceName('');
    setPlacePic('');

    setFormValidity(false);
  }

  function handleClose () { // Хэндлер закрытия
    props.onClose();

    setPlaceName('');
    setPlacePic('');

    setFormValidity(false);
  }

  return (
    <PopupWithForm
      validityState={formValidity}
      onValidityChange={setFormValidity}
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
        onChange={handlePlaceNameChange}
      />
      <Input
        inputModifier="popup__input_card-link"
        inputType="url"
        inputName="link"
        inputValue={placePic}
        inputPlaceholder="Ссылка на картинку"
        onChange={handlePlacePicChange}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;