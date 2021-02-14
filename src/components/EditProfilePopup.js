import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup (props) {
  return (
    <PopupWithForm name="profile" heading="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose}>
      <input
        className="popup__input popup__input_name"
        name="name"
        type="text"
        placeholder="Имя"
        minLength="2" maxLength="40"
        autoComplete="off"
        required
      />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_description"
        name="description"
        type="text"
        placeholder="Описание"
        minLength="2" maxLength="200"
        autoComplete="off"
        required
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;