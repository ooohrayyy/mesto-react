import React from 'react';
import api from '../utils/Api.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from "./ImagePopup.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App () {
  // * Стейт-переменные и функции, которые их контролируют

  const [cards, setCards] = React.useState([]); // Массив карточек

  // Состояние попапа «Редактировать аватар»

  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);

  function handleEditAvatarClick () {
    setAvatarPopup(true);
  }

  // Состояние попапа «Редактировать профиль»

  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);

  function handleEditProfileClick () {
    setProfilePopup(true);
  }

  // Состояние попапа «Добавить карточку»

  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);

  function handleAddPlaceClick () {
    setAddPlacePopup(true);
  }

  // Состояние попапа с полноразмерной картинкой

  const [isImagePopupOpen, setImagePopup] = React.useState(false);

  function handleCardClick () {
    setSelectedCard(this.item);
    setImagePopup(true);
  }

  const [selectedCard, setSelectedCard] = React.useState({}); // Состояние выбранной карточки

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' }); // Состояние активного пользователя

  function closeAllPopups () { // Закрытие всех попапов и обнуление выбранной карточки
    setAvatarPopup(false);
    setProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);

    setSelectedCard(null);
  }

  // * Эффекты при монтировании компонента

  React.useEffect(() => { // Получение данных о пользователе
    api.fetchUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  React.useEffect(() => { // Получение карточек с сервера
    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(`Ошибка: ${err}`));
  }, []);

  // * Функции

  function handleUpdateUser (values) { // Обновление информации о пользователе
    api.patchUserInfo(values)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => `Ошибка: ${err}`);
  }

  function handleUpdateAvatar (link) { // Обновление аватарки пользователя
    api.updateAvatar(link)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container root__container">   
        <Header />
        <Main
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} onClose={closeAllPopups} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="delete" heading="Вы уверены?" onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;