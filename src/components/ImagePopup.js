function ImagePopup () {
  return (
    <div className="popup popup-fullpic root__popup">
      <figure className="popup__figure">
        <button className="popup__close popup__close_fullpic" type="button"></button>
        <img className="popup__fullpic" src="https://example.com/" alt="Полноразмерное изображение" />
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;