import React from 'react';
import api from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App () {
  // * Стейт-переменные и функции, которые их контролируют

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

  const [currentUser, setCurrentUser] = React.useState({}); // Состояние активного пользователя

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

  return (
    <>
      <div className="container root__container">   
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <PopupWithForm name="profile" heading="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input
          className="popup__input popup__input_name"
          name="name"
          type="text"
          placeholder="Имя"
          minLength="2" maxLength="40"
          autoComplete="off"
          required
        />
        <span className="popup__error"></span>
        <input
          className="popup__input popup__input_description"
          name="description"
          type="text"
          placeholder="Описание"
          minLength="2" maxLength="200"
          autoComplete="off"
          required
        />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="avatar" heading="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input
          className="popup__input popup__input_avatar"
          name="avatar"
          type="url"
          placeholder="Ссылка на фото"
          autoComplete="off"
          required
        />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="card" heading="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input
          className="popup__input popup__input_card-name"
          name="place"
          type="text"
          placeholder="Название"
          minLength="2" maxLength="30"
          autoComplete="off"
          required />
        <span className="popup__error"></span>
        <input
          className="popup__input popup__input_card-link"
          name="link"
          type="url"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
        />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete" heading="Вы уверены?" onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;