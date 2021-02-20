import usePopupListeners from '../utils/usePopupListeners.js';

function ImagePopup (props) {
  usePopupListeners(props); // * Хук слушателей для попапа

  return (
    <div className={`popup popup-fullpic root__popup ${props.state.open ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        {props.card && (<button className="popup__close popup__close_fullpic" type="button" onClick={props.onClose} />)}
        <img
          className="popup__fullpic"
          src={props.card ? props.card.link : null}
          alt={props.card ? props.card.alt : null}
        />
        <figcaption className="popup__caption">{props.card ? props.card.caption : null}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;