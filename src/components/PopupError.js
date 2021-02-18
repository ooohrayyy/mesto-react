import errorImage from '../resources/images/svgs/popup-error.svg';

function PopupError (props) {
  return (
    <div className={`popup__message popup-message ${(props.name === 'delete') ? 'popup-message_delete' : ''}`}>
      <img className="popup-message__img" src={errorImage} alt="Иллюстрация ошибки" />
      <h3 className="popup-message__text">{props.message}</h3>
    </div>
  );
}

export default PopupError;