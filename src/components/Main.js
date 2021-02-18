import React from 'react';

import Card from './Card.js';

import avatarLoader from '../resources/images/svgs/avatar-loader.svg';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
  const userInfo = React.useContext(CurrentUserContext); // * Подписка на контекст

  // * Возвращаемое значение

  return (
    <main className="main container__main">
      <section className="profile main__profile">
        <div className="profile__main">
          <img className="profile__avatar" src={userInfo.avatar || avatarLoader} alt="Портрет пользователя" />
          <button className="profile__avatar-button" onClick={props.onEditAvatar} />
          <div className="profile__text-info">
            <h1 className="profile__name">{userInfo.name || 'Загрузка...'}</h1>
            <button className="profile__edit" type="button" onClick={props.onEditProfile} />
            <p className="profile__description">{userInfo.about || 'Пожалуйста, подождите'}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace} />
      </section>
      <section className="cards main__cards">
        {props.cards.map((item) => (
          <Card
            item={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardDelete={props.onCardDelete}
            onCardLike={props.onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;