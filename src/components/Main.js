import React from 'react';
import api from '../utils/Api.js';

import Card from './Card.js';

// import jaque from '../resources/images/jaque.png';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

  const [cards, setCards] = React.useState([]); // * Стейт-переменная с карточками

  // * Эффекты при монтировании компонента

  React.useEffect(() => { // Получение карточек с сервера
    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  // * Функции

  function handleCardDelete (card) { // Обработка удаления карточки
    api.deleteCard(card._id)
      .then(deletedCard => {
        const newCards = cards.filter(deletedCard => deletedCard._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike (card) { // Обработка лайка карточки
    api.toggleLike(card._id, card.isLiked)
      .then(newCard => {
        const newCards = cards.map(item => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }

  return (
    <main className="main container__main">
      <section className="profile main__profile">
        <div className="profile__main">
          <img className="profile__avatar" src={userInfo.avatar} alt="Портрет пользователя" />
          <button className="profile__avatar-button" onClick={props.onEditAvatar} />
          <div className="profile__text-info">
            <h1 className="profile__name">{userInfo.name}</h1>
            <button className="profile__edit" type="button" onClick={props.onEditProfile} />
            <p className="profile__description">{userInfo.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="cards main__cards">
        {cards.map((item) => (
          <Card
            item={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;