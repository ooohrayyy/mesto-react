import React from 'react';
import api from '../utils/Api.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import ImagePopup from "./ImagePopup.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App () {
  // * Стейт-переменные и функции, которые их контролируют

  const [cards, setCards] = React.useState([]); // Массив карточек

  // Состояние попапа «Редактировать аватар»

  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isEditAvatarLoading, setEditAvatarLoading] = React.useState(false);
  const [didEditAvatarFailed, setEditAvatarFailed] = React.useState({
    failed: false,
    message: null
  });

  function handleEditAvatarClick () {
    setAvatarPopup(true);
  }

  // Состояние попапа «Редактировать профиль»

  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);
  const [isEditProfileLoading, setEditProfileLoading] = React.useState(false);
  const [didEditProfileFailed, setEditProfileFailed] = React.useState({
    failed: false,
    message: null
  });

  function handleEditProfileClick () {
    setProfilePopup(true);
  }

  // Состояние попапа «Добавить карточку»

  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isAddPlaceLoading, setAddPlaceLoading] = React.useState(false);
  const [didAddPlaceFailed, setAddPlaceFailed] = React.useState({
    failed: false,
    message: null
  });

  function handleAddPlaceClick () {
    setAddPlacePopup(true);
  }

  // Состояние попапа с подтверждением удаления

  const [isConfirmDeletePopupOpen, setConfirmDeletePopup] = React.useState(false);
  const [isConfirmDeleteLoading, setConfirmDeleteLoading] = React.useState(false);
  const [didConfirmDeleteFailed, setConfirmDeleteFailed] = React.useState({
    failed: false,
    message: null
  });

  function handleDeleteCardClick () {
    setSelectedCard(this.item);
    setConfirmDeletePopup(true);
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
    setConfirmDeletePopup(false);
    setImagePopup(false);

    setSelectedCard(null);
  }

  // * Эффекты при монтировании компонента

  React.useEffect(() => { // Получение данных о пользователе
    api.fetchUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => { // Получение карточек с сервера
    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, []);

  // * Функции

  function handleUpdateUser (values) { // Обновление информации о пользователе
    setEditProfileLoading(true);

    api.patchUserInfo(values)
      .then(res => {
        setCurrentUser(res);
        setTimeout(() => {
          setEditProfileLoading(false);
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setEditProfileLoading(false);
        setEditProfileFailed({
          failed: true,
          message: err
        });
      });
  }

  function handleUpdateAvatar (link) { // Обновление аватарки пользователя
    setEditAvatarLoading(true);

    api.updateAvatar(link)
      .then(res => {
        setCurrentUser(res);
        setTimeout(() => {
          setEditAvatarLoading(false);
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setEditAvatarLoading(false);
        setEditAvatarFailed({
          failed: true,
          message: err
        });
      });
  }

  function handleAddPlaceSubmit (data) { // Добавление новой карточки
    setAddPlaceLoading(true);

    api.postCard(data)
      .then(res => {
        setCards([res, ...cards]);
        setTimeout(() => {
          setAddPlaceLoading(false);
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setAddPlaceLoading(false);
        setAddPlaceFailed({
          failed: true,
          message: err
        });
      });
  }

  function handleCardDelete (card) { // Обработка удаления карточки
    setConfirmDeleteLoading(true);

    api.deleteCard(card._id)
      .then(deletedCard => {
        const newCards = cards.filter(deletedCard => deletedCard._id !== card._id);
        setCards(newCards);
        setTimeout(() => {
          setConfirmDeleteLoading(false);
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setConfirmDeleteLoading(false);
        setConfirmDeleteFailed({
          failed: true,
          message: err
        });
      });
  }

  function handleCardLike (card) { // Обработка лайка карточки
    api.toggleLike(card._id, card.isLiked)
      .then(newCard => {
        const newCards = cards.map(item => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
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
          onCardDelete={handleDeleteCardClick}
          onCardLike={handleCardLike}
        />
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isEditProfileLoading}
        didFailed={didEditProfileFailed}
        initialValidityState={true}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isEditAvatarLoading}
        didFailed={didEditAvatarFailed}
        initialValidityState={false}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isAddPlaceLoading}
        didFailed={didAddPlaceFailed}
        initialValidityState={false}
        onAddPlaceSubmit={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />
      <ConfirmDeletePopup
        card={selectedCard}
        isOpen={isConfirmDeletePopupOpen}
        isLoading={isConfirmDeleteLoading}
        didFailed={didConfirmDeleteFailed}
        initialValidityState={true}
        onDeleteConfirmation={handleCardDelete}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;