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

  const [editAvatarState, setEditAvatarState] = React.useState({
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  function handleEditAvatarClick () {
    setEditAvatarState({ ...editAvatarState, open: true });
  }

  // Состояние попапа «Редактировать профиль»

  const [editProfileState, setEditProfileState] = React.useState({
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  function handleEditProfileClick () {
    setEditProfileState({ ...editProfileState, open: true });
  }

  // Состояние попапа «Добавить карточку»

  const [addPlaceState, setAddPlaceState] = React.useState({
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  function handleAddPlaceClick () {
    setAddPlaceState({ ...addPlaceState, open: true });
  }

  // Состояние попапа с подтверждением удаления

  const [confirmDeleteState, setConfirmDeleteState] = React.useState({
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  function handleDeleteCardClick () {
    setSelectedCard(this.item);
    setConfirmDeleteState({ ...confirmDeleteState, open: true });
  }

  // Состояние попапа с полноразмерной картинкой

  const [imagePopupState, setImagePopupState] = React.useState({
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  function handleCardClick () {
    setSelectedCard(this.item);
    setImagePopupState({ ...imagePopupState, open: true });
  }

  const [selectedCard, setSelectedCard] = React.useState({}); // Состояние выбранной карточки

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' }); // Состояние активного пользователя

  function closeAllPopups () { // Закрытие всех попапов и обнуление выбранной карточки
    setEditAvatarState({ ...editAvatarState, open: false });
    setEditProfileState({ ...editProfileState, open: false });
    setAddPlaceState({ ...addPlaceState, open: false });
    setConfirmDeleteState({ ...confirmDeleteState, open: false });
    setImagePopupState({ ...imagePopupState, open: false });

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
    setEditProfileState({ ...editProfileState, loading: true });

    api.patchUserInfo(values)
      .then(res => {
        setCurrentUser(res);
        setTimeout(() => {
          setEditProfileState({ ...editProfileState, open: false, loading: false });
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setEditProfileState({
          ...editProfileState,
          loading: false,
          failed: true,
          message: err
        });
      });
  }

  function handleUpdateAvatar (link) { // Обновление аватарки пользователя
    setEditAvatarState({ ...editAvatarState, loading: true });

    api.updateAvatar(link)
      .then(res => {
        setCurrentUser(res);
        setTimeout(() => {
          setEditAvatarState({ ...editAvatarState, open: false, loading: false });
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setEditAvatarState({
          ...editAvatarState,
          loading: false,
          failed: true,
          message: err
        });
      });
  }

  function handleAddPlaceSubmit (data) { // Добавление новой карточки
    setAddPlaceState({ ...addPlaceState, loading: true });

    api.postCard(data)
      .then(res => {
        setCards([res, ...cards]);
        setTimeout(() => {
          setAddPlaceState({ ...addPlaceState, open: false, loading: false });
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setAddPlaceState({
          ...addPlaceState,
          loading: false,
          failed: true,
          message: err
        });
      });
  }

  function handleCardDelete (card) { // Обработка удаления карточки
    setConfirmDeleteState({ ...confirmDeleteState, loading: true });

    api.deleteCard(card._id)
      .then(deletedCard => {
        const newCards = cards.filter(deletedCard => deletedCard._id !== card._id);
        setCards(newCards);
        setTimeout(() => {
          setConfirmDeleteState({ ...confirmDeleteState, open: false, loading: false });
        }, 400);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
        setConfirmDeleteState({
          ...confirmDeleteState,
          loading: false,
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
        state={editProfileState}
        initialValidityState={true}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        state={editAvatarState}
        initialValidityState={false}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
      <AddPlacePopup
        state={addPlaceState}
        initialValidityState={false}
        onAddPlaceSubmit={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />
      <ConfirmDeletePopup
        card={selectedCard}
        state={confirmDeleteState}
        initialValidityState={true}
        onDeleteConfirmation={handleCardDelete}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} state={imagePopupState} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;