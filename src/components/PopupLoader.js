import loader from '../resources/images/svgs/popup-loader.svg';

function PopupLoader (props) {
  return (
    <div className={`popup__message popup-message ${(props.name === 'delete') ? 'popup-message_delete' : ''}`}>
      <img className="popup-message__img" src={loader} alt="Индикатор загрузки" />
      <h3 className="popup-message__text">Загрузка...</h3>
    </div>
  );
}

export default PopupLoader;