import React, { useState, useEffect } from 'react';
import './Profile.css';
import Avatar from './Avatar';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import { ProfileContext } from './context';

function Profile({ currentUser, onLogout }) {
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [codeInUrl, setCodeInUrl] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [mangaList, setMangaList] = useState([]);

  const [userImage, setUserImage] = useState('');
  const togglePersonalInfo = () => {
    setShowPersonalInfo(!showPersonalInfo);
  };

  useEffect(() => {
    // Проверяем, есть ли параметр code в URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code')) {
      setCodeInUrl(urlParams.get('code'));
    }
  }, []);

  return (
    <ProfileContext.Provider value={{ setUserImage, userImage, animeList, mangaList }} >
    <div className='profile'>
      <div className='youself'>
        <div className='chenge_profile'>
          <Avatar />
        </div>
          <h2 className='name'>{currentUser.username}</h2>
          <hr className="separator" />
      <h4 onClick={togglePersonalInfo} style={{ cursor: 'pointer' }}>
        {showPersonalInfo ? 'Личная информация:' : 'Личная информация...'}
      </h4>

      <div className={`info-container ${showPersonalInfo ? 'visible' : ''}`}>
      <div>
          <div>Имя: {currentUser.name}</div>
          <div>Фамилия: {currentUser.surname}</div>
          <div>Пол: {currentUser.gender}</div>
          <div>Возраст: {currentUser.age}</div>
        </div>
      </div>
      <hr className="separator" />
        <button className='onLogout_but' onClick={onLogout}>
            <Link to="/" className="link">Выйти</Link>
        </button>
      {/* <style>
        {`
          html {
            height: 100%;
            margin: 0 auto;
            font-family: 'Montserrat', sans-serif;
          }
        `}
      </style> */}

      </div>
      <Menu currentUser={currentUser} />
    </div>
    </ProfileContext.Provider>
  );
}

export default Profile;