import loaderImage from '../resources/images/svgs/popup-loader.svg';
import errorImage from '../resources/images/svgs/popup-error.svg';

function PopupMessage (props) {
  return (
    <div className={`popup__message popup-message ${(props.name === 'delete') ? 'popup-message_delete' : ''}`}>
      <img className="popup-message__img" src={props.state.loading ? loaderImage : errorImage} alt="Иллюстрация сообщения" />
      <h3 className="popup-message__text">{props.state.loading ? 'Загрузка...' : props.state.message}</h3>
    </div>
  );
}

export default PopupMessage;