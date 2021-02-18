import loader from '../resources/images/svgs/popup-loader.svg';

function PopupLoader (props) {
  return (
    <div className={`popup__loader popup-loader ${(props.name === 'delete') ? 'popup-loader_delete' : ''}`}>
      <img className="popup-loader__img" src={loader} alt="Индикатор загрузки" />
      <h3 className="popup-loader__text">Загрузка...</h3>
    </div>
  );
}

export default PopupLoader;