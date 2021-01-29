import './App.css';

function App() {
  return (
    <div className="container root__container">   
      <header className="header container__header">
        <img className="header__logo" src="<%=require('./resources/images/svgs/logo.svg')%>" alt="Логотип Mesto" />
      </header>
      <main className="main container__main">
        <section className="profile main__profile">
          <div className="profile__main">
            <img className="profile__avatar" src="<%=require('./resources/images/jaque.png')%>" alt="Портрет пользователя" />
            <button className="profile__avatar-button"></button>
            <div className="profile__text-info">
              <h1 className="profile__name">Жак-Ив Кусто</h1>
              <button className="profile__edit" type="button"></button>
              <p className="profile__description">Исследователь океана</p>
            </div>
          </div>
          <button className="profile__add" type="button"></button>
        </section>
        <section className="cards main__cards">
        </section>
      </main>
      <footer className="footer container__footer">
        <p className="footer__text">&COPY; 2020 Mesto Russia</p>
      </footer>
    </div>
  );
}

export default App;
