import errorImage from '../resources/images/svgs/popup-error.svg';

function PopupError (props) {
  return (
    <div className={`popup__error popup-error ${(props.name === 'delete') ? 'popup-error_delete' : ''}`}>
      <img className="popup-error__img" src={errorImage} alt="Иллюстрация ошибки" />
      <h3 className="popup-error__text">{props.message}</h3>
    </div>
  );
}

export default PopupError;