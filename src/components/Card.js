import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

  // * Дополнение данных о карточке

  const cardData = props.item;
  cardData.alt = cardData.name;
  cardData.caption = `${cardData.alt} / © ${cardData.owner.name}`;
  cardData.isOwn = cardData.owner._id === userInfo._id;
  cardData.isLiked = cardData.likes.some(like => like._id === userInfo._id)

  // * Переменные стилей

  const cardLikeButtonClassName = ( // Стиль кнопки лайка
    `card__like ${cardData.isLiked ? 'card__like_active' : ''}`
  );

  // * Функции

  function handleClick () { // Клик по карточке (открытие попапа с полноразмерной картинкой)
    props.onCardClick(cardData);
  }

  return (
    <article className="card" key={props.i}>
      <button className="card__open-fullpic" type="button" onClick={handleClick}>
        <img className="card__image" src={cardData.link} alt={cardData.alt} />
      </button>
      <div className="card__label">
        <h2 className="card__name">{cardData.name}</h2>
        <button className={cardLikeButtonClassName} type="button">
          <p className="card__counter">{cardData.likes.length}</p>
        </button>
      </div>
    </article>
  );
}

export default Card;