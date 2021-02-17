import loader from '../resources/images/svgs/loader.svg';

function Loader () {
  return (
    <div className="loader">
      <img className="loader__img" src={loader} alt="Индикатор загрузки" />
      <h3 className="loader__text">Загрузка...</h3>
    </div>
  );
}

export default Loader;