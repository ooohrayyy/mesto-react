import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

  const loadingRef = React.useRef(false); // * Реф-переменная загрузки лайка
  const [isLoading, setLikeIsLoading] = React.useState(loadingRef.current); // * Стейт-переменная загрузки лайка

  // * Дополнение данных о карточке

  const cardData = props.item;
  cardData.alt = cardData.name;
  cardData.caption = `${cardData.alt} / © ${cardData.owner.name}`;
  cardData.isOwn = cardData.owner._id === userInfo._id;
  cardData.isLiked = cardData.likes.some(like => like._id === userInfo._id)

  const cardLikeButtonClassName = ( // * Стиль кнопки лайка
    `card__like ${cardData.isLiked ? 'card__like_active' : ''}`
  );

  // * Функции

  function handleClick () { // Клик по карточке (открытие попапа с полноразмерной картинкой)
    props.onCardClick(cardData);
  }

  function handleDelete () {
    props.onCardDelete(cardData); // Удаление карточки
  }

  function handleLike () { // Клик по лайку
    loadingRef.current = true;
    setLikeIsLoading(loadingRef.current);

    console.log('Change!'); // !

    props.onCardLike(cardData);
  }

  React.useEffect(() => { // * Эффект обновления иконки лайка
    console.log('Render!'); // !
    loadingRef.current = false;
    setLikeIsLoading(loadingRef.current);
  }, [props]);

  return (
    <article className="card" key={props.i}>
      <button className="card__open-fullpic" type="button" onClick={handleClick}>
        <img className="card__image" src={cardData.link} alt={cardData.alt} />
      </button>
      {cardData.isOwn && (<button className="card__delete" type="button" onClick={handleDelete}></button>)}
      <div className="card__label">
        <h2 className="card__name">{cardData.name}</h2>
        {!isLoading && (<button className={cardLikeButtonClassName} type="button" onClick={handleLike}>
          <p className="card__counter">{cardData.likes.length}</p>
        </button>)}
        {isLoading && (<button className="card__loader" disabled />)}
      </div>
    </article>
  );
}

export default Card;