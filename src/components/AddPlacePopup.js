import React from 'react';

import PopupWithForm from './PopupWithForm.js';

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
  }

  return (
    <PopupWithForm
      name="card"
      heading="Новое место"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      onClose={props.onClose}
    >
      <input
        className="popup__input popup__input_card-name"
        type="text"
        name="place"
        value={placeName}
        placeholder="Название"
        minLength="2" maxLength="30"
        autoComplete="off"
        required
        onChange={handlePlaceNameChange}
      />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_card-link"
        type="url"
        name="link"
        value={placePic}
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        onChange={handlePlacePicChange}
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;