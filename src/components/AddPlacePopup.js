import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup (props) {
  return (
    <PopupWithForm name="card" heading="Новое место" isOpen={props.isOpen} onClose={props.onClose}>
      <input
        className="popup__input popup__input_card-name"
        name="place"
        type="text"
        placeholder="Название"
        minLength="2" maxLength="30"
        autoComplete="off"
        required />
      <span className="popup__error"></span>
      <input
        className="popup__input popup__input_card-link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;