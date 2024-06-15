import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import SearchBar from './SearchBar.js'

function Header({ currentUser, toggleTheme, isDarkMode, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="header-container">
        <div className="header">
        <h1><Link to="/" className="header-link" >Стартовая страница</Link></h1>
            <div className="categories">
            <div><Link to="/animes/sort/-score"  className="category">Календарь учителя</Link></div>
            <div><Link to="/data-manga/sort/-score" className="category">Мои заявки</Link></div>
            <div><Link to="/manga/recommendations" className="category">Мой календарь</Link></div>
            <div><Link to="/anime/recommendations" className="category">Учителя</Link></div>
          </div>
          {/* <SearchBar /> */}
          <div className="registration-link">
          {currentUser ? (
              <div className="dropdown">
              <Link to="/profile">{currentUser.username} ▾</Link>
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/profile">Профиль</Link>
                  </li>
                  <li>
                    <Link onClick={onLogout} to="/logout">Выход</Link>
                  </li>
                </ul>
              </div>
            </div>
            ) : (
              <>
                <Link to="/registration">Регистрация</Link>
                <Link to="/login">Вход</Link>
              </>
            )}
          </div>
          
        </div>
    </div>
  );
}

export default Header;