import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function AddPlacePopup (props) {
  // * Управляемые стейт-переменные

  const [placeName, setPlaceName] = React.useState(''); // Имя места

  function handlePlaceNameChange (evt) {
    setPlaceName(evt.target.value);
  }

  const [placePic, setPlacePic] = React.useState(''); // Адрес иллюстрации места

  function handlePlacePicChange (evt) {
    setPlacePic(evt.target.value);
  }

  function handleSubmit (evt) { // * Хэндлер сабмита
    evt.preventDefault();

    props.onAddPlaceSubmit({
      name: placeName,
      link: placePic
    });

    setPlaceName('');
    setPlacePic('');
  }

  return (
    <PopupWithForm
      name="card"
      heading="Новое место"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
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