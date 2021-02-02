import jaque from '../resources/images/jaque.png';

function Main () {
  return (
    <main className="main container__main">
      <section className="profile main__profile">
        <div className="profile__main">
          <img className="profile__avatar" src={jaque} alt="Портрет пользователя" />
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
  );
}

export default Main;