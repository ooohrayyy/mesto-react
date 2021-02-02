function PopupWithForm (props) {
  let button;
  if (props.name === 'delete') {
    button = <button className="popup__button" type="submit">Удалить</button>;
  } else {
    button = <button className="popup__button" type="submit">Сохранить</button>;
  }
  
  return (
    <div className={`popup popup-${props.name} root__popup ${props.isOpen ? 'popup_opened' : null}`}>
        <form className="popup__container" name={props.name} noValidate>
          <button className="popup__close" type="button"></button>
          <h2 className="popup__heading">{props.heading}</h2>
          {props.children}
          {button}
        </form>
    </div>
  );
}

export default PopupWithForm;