import loader from '../resources/images/svgs/loader.svg';

function PopupLoader (props) {
  return (
    <div className={`loader ${(props.name === 'delete') ? 'loader_delete' : ''}`}>
      <img className="loader__img" src={loader} alt="Индикатор загрузки" />
      <h3 className="loader__text">Загрузка...</h3>
    </div>
  );
}

export default PopupLoader;