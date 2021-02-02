import jaque from '../resources/images/jaque.png';

function handleEditAvatarClick () {
  const editAvatarPopup = document.querySelector('.popup-avatar');
  editAvatarPopup.classList.add('popup_opened');
}

function handleEditProfileClick () {
  const editProfilePopup = document.querySelector('.popup-profile');
  editProfilePopup.classList.add('popup_opened');
}

function handleAddPlaceClick () {
  const addPlacePopup = document.querySelector('.popup-card');
  addPlacePopup.classList.add('popup_opened');
}

function Main () {
  return (
    <main className="main container__main">
      <section className="profile main__profile">
        <div className="profile__main">
          <img className="profile__avatar" src={jaque} alt="Портрет пользователя" />
          <button className="profile__avatar-button" onClick={handleEditAvatarClick}></button>
          <div className="profile__text-info">
            <h1 className="profile__name">Жак-Ив Кусто</h1>
            <button className="profile__edit" type="button" onClick={handleEditProfileClick}></button>
            <p className="profile__description">Исследователь океана</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="cards main__cards">
      </section>
    </main>
  );
}

export default Main;