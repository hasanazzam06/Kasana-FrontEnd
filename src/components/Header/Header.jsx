// src/components/Header.jsx
import NavButtons from './NavButtons';
import './Header.css';

const Header = ({
  currentProject,
  activeView,
  onNavClick,
  userRole,
}) => {

  return (
    <header className="header-main">
      <h1 className="header-title">{currentProject.name}</h1>
      <nav className="nav-main">
        <NavButtons activeView={activeView} onNavClick={onNavClick} userRole={userRole} />
      </nav>
    </header>
  );
};

export default Header;