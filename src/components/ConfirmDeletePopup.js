import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup (props) {
  return (
    <PopupWithForm
      name="delete"
      heading="Вы уверены?"
      isOpen={props.isOpen}
      onSubmit={props.onSubmit}
      onClose={props.onClose}
    />
  )
}

export default ConfirmDeletePopup;