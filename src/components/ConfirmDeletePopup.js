import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup (props) {
  
  // * Обработчик сабмита формы

  function handleSubmit (evt) {
    evt.preventDefault();
    props.onDeleteConfirmation(props.card);
  }

  // * Возвращаемое значение

  return (
    <PopupWithForm
      state={props.state}
      formValidityState={props.initialValidityState}
      name="delete"
      heading="Вы уверены?"
      onSubmit={handleSubmit}
      onClose={props.onClose}
    />
  )
}

export default ConfirmDeletePopup;