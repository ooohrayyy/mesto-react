import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup (props) {
  // * Управляемые стейт-переменные

  // Имя пользователя

  const [name, setName] = React.useState('');

  function handleNameChange (evt) {
    setName(evt.target.value);
  }

  // Описание пользователя

  const [description, setDescription] = React.useState('');

  function handleDescriptionChange (evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm name="profile" heading="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>
      <input
        className="popup__input popup__input_name"
        type="text"
        name="name"
        value={name}
        placeholder="Имя"
        minLength="2" maxLength="40"
        autoComplete="off"
        required
        onChange={handleNameChange}
      />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_description"
        type="text"
        name="description"
        value={description}
        placeholder="Описание"
        minLength="2" maxLength="200"
        autoComplete="off"
        required
        onChange={handleDescriptionChange}
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;