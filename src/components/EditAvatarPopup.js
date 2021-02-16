import React from 'react';

import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup (props) {
  const avatarInputRef = React.useRef(); // * Реф инпута с адресом новой аватарки

  function handleSubmit (evt) { // * Хэндлер сабмита
    evt.preventDefault();

    props.onUpdateAvatar(avatarInputRef.current.value);
    avatarInputRef.current.value = '';
  }

  return (
    <PopupWithForm name="avatar" heading="Обновить аватар" isOpen={props.isOpen} onSubmit={handleSubmit} onClose={props.onClose}>
      <input
        className="popup__input popup__input_avatar"
        name="avatar"
        type="url"
        ref={avatarInputRef}
        placeholder="Ссылка на фото"
        autoComplete="off"
        required
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;