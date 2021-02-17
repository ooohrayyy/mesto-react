import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function EditAvatarPopup (props) {
  // ! Реф инпута с адресом новой аватарки не используется из-за валидации: не нашёл способа совместить.
  // ! Зато реф есть в самом Input! :)

  // * Стейт-переменные

  // Ссылка на аватарку

  const [link, setLink] = React.useState('');

  function handleLinkChange (evt) {
    setLink(evt.target.value);
  }

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидности формы

  const [inputValidity, setInputValidity] = React.useState(true); // Состояние валидности инпута

  // * Функции

  function handleSubmit (evt) { // Хэндлер сабмита
    evt.preventDefault();

    props.onUpdateAvatar(link);

    setLink('');
    setInputValidity(true);
    setFormValidity(false);
  }

  function handleClose () { // Хэндлер закрытия
    props.onClose();

    setLink('');
    setInputValidity(true);
    setFormValidity(false);
  }

  return (
    <PopupWithForm
      formValidityState={formValidity}
      onFormValidityChange={setFormValidity}
      name="avatar"
      heading="Обновить аватар"
      isOpen={props.isOpen}
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