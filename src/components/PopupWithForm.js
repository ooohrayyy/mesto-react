function PopupWithForm (props) {
  return (
    <div className={`popup popup-${props.name} root__popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <form className="popup__container" name={props.name} noValidate onSubmit={props.onSubmit}>
          <button className="popup__close" type="button" onClick={props.onClose} />
          <h2 className="popup__heading">{props.heading}</h2>
          {props.children}
          <button className="popup__button" type="submit">
            {(props.name === 'delete') ? 'Удалить' : 'Сохранить'}
          </button>
        </form>
    </div>
  );
}

export default PopupWithForm;