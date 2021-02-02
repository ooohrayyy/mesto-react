import logo from '../resources/images/svgs/logo.svg';

function Header () {
  return (
    <header className="header container__header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
    </header>
  );
}

export default Header;