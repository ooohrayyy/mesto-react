// ! Привет команде код-ревью! Сначало было страшно, но чем дальше — тем приятнее React

import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";

function App () {
  const [isEditAvatarPopupOpen, setAvatarPopup] = React.useState(false);
  const [isEditProfilePopupOpen, setProfilePopup] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false);
  const [isImagePopupOpen, setImagePopup] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick () {
    setAvatarPopup(true);
  }
  
  function handleEditProfileClick () {
    setProfilePopup(true);
  }
  
  function handleAddPlaceClick () {
    setAddPlacePopup(true);
  }

  function handleCardClick () {
    setSelectedCard(this.item);
    setImagePopup(true);
  }

  function closeAllPopups () {
    setAvatarPopup(false);
    setProfilePopup(false);
    setAddPlacePopup(false);
    setImagePopup(false);

    setSelectedCard(null);
  }

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
        <input className="popup__input popup__input_name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
        <span className="popup__error"></span>
        <input className="popup__input popup__input_description" name="description" type="text" placeholder="Описание" minLength="2" maxLength="200" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="avatar" heading="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_avatar" name="avatar" type="url" placeholder="Ссылка на фото" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="card" heading="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input className="popup__input popup__input_card-name" name="place" type="text" placeholder="Название" minLength="2" maxLength="30" autoComplete="off" required />
        <span className="popup__error"></span>
        <input className="popup__input popup__input_card-link" name="link" type="url" placeholder="Ссылка на картинку" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete" heading="Вы уверены?" onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups} />
    </>
  );
}

export default App;