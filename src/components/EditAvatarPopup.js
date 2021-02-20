import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function EditAvatarPopup (props) {
  
  // * Стейт-переменные

  const [link, setLink] = React.useState(''); // Адрес файла аватарки

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы
  const [inputValidity, setInputValidity] = React.useState(true); // Состояние валидности инпута

  // * Функции

  // -- Обработчики формы

  function handleLinkChange (evt) { // Изменение значения инпута
    setLink(evt.target.value);
  }

  function handleSubmit (evt) { // Сабмит формы
    evt.preventDefault();

    props.onUpdateAvatar(link);

    setLink('');
    setInputValidity(true);
    setFormValidity(false);
  }

  function handleClose () { // Закрытие формы
    props.onClose();

    setLink('');
    setInputValidity(true);
    setFormValidity(false);
  }

  // * Возвращаемое значение

  return (
    <PopupWithForm
      state={props.state}
      formValidityState={formValidity}
      onFormValidityChange={setFormValidity}
      name="avatar"
      heading="Обновить аватар"
      onSubmit={handleSubmit}
      onClose={handleClose}>
      <Input
        inputModifier="popup__input_avatar"
        inputName="avatar"
        inputValue={link}
        inputType="url"
        inputPlaceholder="Ссылка на фото"
        inputValidityState={inputValidity}
        onInputValidityChange={setInputValidity}
        onValueChange={handleLinkChange}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;