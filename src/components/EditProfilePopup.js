import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

  // * Cтейт-переменные

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

  const [formValidity, setFormValidity] = React.useState(true); // Состояние валидности формы

  const [nameValidity, setNameValidity] = React.useState(true); // Состояние валидности инпута с именем
  const [descriptionValidity, setDescriptionValidity] = React.useState(true); // Состояние валидности инпута с описанием

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

    setFormValidity(true);
  }

  function handleClose () { // Обработка закрытия формы
    props.onClose();

    setName(userInfo.name);
    setDescription(userInfo.about);

    setNameValidity(true);
    setDescriptionValidity(true);
    setFormValidity(true);
  }

  return (
    <PopupWithForm
      state={props.state}
      formValidityState={formValidity}
      onFormValidityChange={setFormValidity}
      name="profile"
      heading="Редактировать профиль"
      onSubmit={handleSubmit}
      onClose={handleClose}
    >
      <Input
        inputModifier="popup__input_name"
        inputType="text"
        inputName="name"
        inputValue={name}
        inputPlaceholder="Имя"
        inputMaxLength="40"
        inputValidityState={nameValidity}
        onInputValidityChange={setNameValidity}
        onValueChange={handleNameChange}
      />
      <Input
        inputModifier="popup__input_description"
        inputType="text"
        inputName="description"
        inputValue={description}
        inputPlaceholder="Описание"
        inputMaxLength="200"
        inputValidityState={descriptionValidity}
        onInputValidityChange={setDescriptionValidity}
        onValueChange={handleDescriptionChange}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;