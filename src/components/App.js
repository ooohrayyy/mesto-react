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

  function handleEditAvatarClick () {
    setAvatarPopup(true);
  }
  
  function handleEditProfileClick () {
    setProfilePopup(true);
  }
  
  function handleAddPlaceClick () {
    setAddPlacePopup(true);
  }

  return (
    <>
      <div className="container root__container">   
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
        />
        <Footer />
      </div>
      <PopupWithForm name="profile" heading="Редактировать профиль" isOpen={isEditProfilePopupOpen}>
        <input className="popup__input popup__input_name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
        <span className="popup__error"></span>
        <input className="popup__input popup__input_description" name="description" type="text" placeholder="Описание" minLength="2" maxLength="200" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="avatar" heading="Обновить аватар" isOpen={isEditAvatarPopupOpen}>
        <input className="popup__input popup__input_avatar" name="avatar" type="url" placeholder="Ссылка на фото" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="card" heading="Новое место" isOpen={isAddPlacePopupOpen}>
        <input className="popup__input popup__input_card-name" name="place" type="text" placeholder="Название" minLength="2" maxLength="30" autoComplete="off" required />
        <span className="popup__error"></span>
        <input className="popup__input popup__input_card-link" name="link" type="url" placeholder="Ссылка на картинку" autoComplete="off" required />
        <span className="popup__error"></span>
      </PopupWithForm>
      <PopupWithForm name="delete" heading="Вы уверены?" />
      <ImagePopup />
      <template id="template-card">
        <article className="card">
          <button className="card__open-fullpic" type="button">
            <img className="card__image" src="https://example.com/" alt="Фотография в карточке" />
          </button>
          <div className="card__label">
            <h2 className="card__name"></h2>
            <button className="card__like" type="button">
              <p className="card__counter">0</p>
            </button>
          </div>
        </article>
      </template>
    </>
  );
}

export default App;