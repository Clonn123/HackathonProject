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
        <h1><Link to="/" className="header-link" >Календарь консультаций</Link></h1>
        <div className="categories">
          {currentUser && currentUser.role_id === 1 && (
            <div><Link to="/user/calendar" className="category">Мой календарь</Link></div>
          )}
          {currentUser && currentUser.role_id === 0 && (
            <>
              <div><Link to="/my_appointments" className="category">Мои заявки</Link></div>
              <div><Link to="/list/teachers" className="category">Преподаватели</Link></div>
            </>
          )}
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
                    <Link onClick={onLogout} to="/">Выход</Link>
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