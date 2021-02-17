import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function EditAvatarPopup (props) {
  // ! Реф инпута с адресом новой аватарки не используется из-за валидации, поскольку передать реф в дочерний компонент вроде как нельзя.
  // ! Зато реф есть в самом Input! :)

  // * Стейт-переменные

  // Ссылка на аватарку

  const [link, setLink] = React.useState('');

  function handleLinkChange (evt) {
    setLink(evt.target.value);
  }

  const [formValidity, setFormValidity] = React.useState(false); // Состояние валидации

  // * Функции

  function handleSubmit (evt) { // Хэндлер сабмита
    evt.preventDefault();

    props.onUpdateAvatar(link);

    setLink('');
    setFormValidity(false);
  }

  function handleClose () { // Хэндлер закрытия
    props.onClose();

    setLink('');
    setFormValidity(false);
  }

  return (
    <PopupWithForm
      validityState={formValidity}
      onValidityChange={setFormValidity}
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
        onChange={handleLinkChange}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;