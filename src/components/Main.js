import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

import jaque from '../resources/images/jaque.png';

function Main (props) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState(jaque);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.fetchUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
      });

    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      });
  }, []);

  return (
    <main className="main container__main">
      <section className="profile main__profile">
        <div className="profile__main">
          <img className="profile__avatar" src={userAvatar} alt="Портрет пользователя" />
          <button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
          <div className="profile__text-info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
            <p className="profile__description">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="cards main__cards">
        {cards.map((item) => (
          <Card item={item} key={item._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;