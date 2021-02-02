import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';

function App () {
  return (
    <>
      <div className="container root__container">   
        <Header />
        <Main />
        <Footer />
      </div>
      <div className="popup popup-profile root__popup">
        <form className="popup__container" name="profile" noValidate>
          <button className="popup__close" type="button"></button>
          <h2 className="popup__heading">Редактировать профиль</h2>
          <input className="popup__input popup__input_name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" autoComplete="off" required />
          <span className="popup__error"></span>
          <input className="popup__input popup__input_description" name="description" type="text" placeholder="Описание" minLength="2" maxLength="200" autoComplete="off" required />
          <span className="popup__error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
      <div className="popup popup-avatar root__popup">
        <form className="popup__container" name="avatar-form" noValidate>
          <button className="popup__close" type="button"></button>
          <h2 className="popup__heading">Обновить аватар</h2>
          <input className="popup__input popup__input_avatar" name="avatar" type="url" placeholder="Ссылка на фото" autoComplete="off" required />
          <span className="popup__error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
      <div className="popup popup-card root__popup">
        <form className="popup__container" name="card" noValidate>
          <button className="popup__close" type="button"></button>
          <h2 className="popup__heading">Новое место</h2>
          <input className="popup__input popup__input_card-name" name="place" type="text" placeholder="Название" minLength="2" maxLength="30" autoComplete="off" required />
          <span className="popup__error"></span>
          <input className="popup__input popup__input_card-link" name="link" type="url" placeholder="Ссылка на картинку" autoComplete="off" required />
          <span className="popup__error"></span>
          <button className="popup__button" type="submit">Создать</button>
        </form>
      </div>
      <div className="popup popup-delete root__popup">
        <section className="popup__container">
          <button className="popup__close" type="button"></button>
          <h2 className="popup__heading popup__heading_delete">Вы уверены?</h2>
          <button className="popup__button popup__button_type_delete" type="submit">Да</button>
        </section>
      </div>
      <div className="popup popup-fullpic root__popup">
        <figure className="popup__figure">
          <button className="popup__close popup__close_fullpic" type="button"></button>
          <img className="popup__fullpic" src="https://example.com/" alt="Полноразмерное изображение" />
          <figcaption className="popup__caption"></figcaption>
        </figure>
      </div>
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