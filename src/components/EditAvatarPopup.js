function EditAvatarPopup (props) {
  return (
    <PopupWithForm name="avatar" heading="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose}>
      <input
        className="popup__input popup__input_avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на фото"
        autoComplete="off"
        required
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;