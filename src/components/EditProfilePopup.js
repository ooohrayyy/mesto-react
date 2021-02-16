import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

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

  // * Эффекты при монтировании компонента

  React.useEffect(() => { // Установка имени и описания пользователя по умолчанию
    setName(userInfo.name);
    setDescription(userInfo.about);
  }, [userInfo]);

  // * Функции

  function handleSubmit (evt) { // Обработка сабмита формы
    evt.preventDefault();

    props.onUpdateUser({
      name,
      description
    });
  }

  return (
    <PopupWithForm name="profile" heading="Редактировать профиль" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
      {/* <input
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
      <span className="popup__error"></span> */}
      <Input
        inputModifier="popup__input_name"
        inputType="text"
        inputName="name"
        inputValue={name}
        inputPlaceholder="Имя"
        inputMaxLength="40"
        onChange={handleNameChange}
      />
      {/* <input
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
      <span className="popup__error"></span> */}
      <Input
        inputModifier="popup__input_description"
        inputType="text"
        inputName="description"
        inputValue={description}
        inputPlaceholder="Описание"
        inputMaxLength="200"
        onChange={handleDescriptionChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;