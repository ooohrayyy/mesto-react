import React from 'react';
import api from '../utils/Api.js';
import Card from './Card.js';

// import jaque from '../resources/images/jaque.png';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main (props) {
  const userInfo = React.useContext(CurrentUserContext);

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      });
  }, []);

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
          <Card item={item} key={item._id} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;