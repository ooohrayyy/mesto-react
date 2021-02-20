import React from 'react';
import api from '../utils/api.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from './ConfirmDeletePopup.js';
import ImagePopup from "./ImagePopup.js";

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App () {

  // * Стейт-переменные

  // -- Общие состояния

  const [currentUser, setCurrentUser] = React.useState({ name: '', about: '' }); // Активный пользователь
  const [cards, setCards] = React.useState([]); // Массив карточек
  const [selectedCard, setSelectedCard] = React.useState({}); // Выбранная карточка

  // -- Состояния попапов

  const [editAvatarState, setEditAvatarState] = React.useState({ // Состояние попапа «Редактировать аватар»
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  const [editProfileState, setEditProfileState] = React.useState({ // Состояние попапа «Редактировать профиль»
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  const [addPlaceState, setAddPlaceState] = React.useState({ // Состояние попапа «Добавить карточку»
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  const [confirmDeleteState, setConfirmDeleteState] = React.useState({ // Состояние попапа с подтверждением удаления
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  const [imagePopupState, setImagePopupState] = React.useState({ // Состояние попапа с полноразмерной картинкой
    open: false,
    loading: false,
    failed: false,
    message: null
  });

  // * Функции

  // -- Функции вызова попапов

  function handleEditAvatarClick () { // Вызов попапа «Редактировать аватар»
    setEditAvatarState({ ...editAvatarState, open: true });
  }

  function handleEditProfileClick () { // Вызов попапа «Редактировать профиль»
    setEditProfileState({ ...editProfileState, open: true });
  }

  function handleAddPlaceClick () { // Вызов попапа «Добавить карточку»
    setAddPlaceState({ ...addPlaceState, open: true });
  }

  function handleDeleteCardClick () { // Вызов попапа с подтверждением удаления
    setSelectedCard(this.item);
    setConfirmDeleteState({ ...confirmDeleteState, open: true });
  }

  function handleCardClick () { // Вызов попапа с полноразмерной картинкой
    setSelectedCard(this.item);
    setImagePopupState({ ...imagePopupState, open: true });
  }

  // -- Обработчики запросов

  function handleUpdateAvatar (link) { // Обновление аватарки
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

  function handleCardDelete (card) { // Удаление карточки
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

  function handleCardLike (card) { // Установка и снятие лайка
    api.toggleLike(card._id, card.isLiked)
      .then(newCard => {
        const newCards = cards.map(item => item._id === card._id ? newCard : item);
        setCards(newCards);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // -- Другие функции
  
  function closeAllPopups () { // Закрытие всех попапов и обнуление выбранной карточки
    setEditAvatarState({ ...editAvatarState, open: false });
    setEditProfileState({ ...editProfileState, open: false });
    setAddPlaceState({ ...addPlaceState, open: false });
    setConfirmDeleteState({ ...confirmDeleteState, open: false });
    setImagePopupState({ ...imagePopupState, open: false });

    setSelectedCard(null);
  }

  // * Эффекты при монтировании компонента

  // -- Запросы к серверу

  React.useEffect(() => { // Получение данных о пользователе
    api.fetchUserInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, []);

  React.useEffect(() => { // Получение карточек
    api.fetchInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, []);

  // * Возвращаемое значение

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