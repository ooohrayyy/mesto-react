import React from 'react';

import PopupWithForm from './PopupWithForm.js';
import Input from './Input.js';

function EditAvatarPopup (props) {
  // ! Реф инпута с адресом новой аватарки не используется из-за валидации, поскольку передать реф в дочерний компонент вроде как нельзя.
  // ! Зато реф есть в самом Input! :)

  const [link, setLink] = React.useState('');

  function handleLinkChange (evt) {
    setLink(evt.target.value);
  }

  function handleSubmit (evt) { // * Хэндлер сабмита
    evt.preventDefault();
    props.onUpdateAvatar(link);
    setLink('');
  }

  return (
    <PopupWithForm initialValidityState={props.initialValidityState} name="avatar" heading="Обновить аватар" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
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