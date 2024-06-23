import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
import SettingsPage from './SettingProfile';

function Menu({currentUser}) {
  const [showSettint, setSettting] = useState(false);

  const togglesSettting = () => {
    setSettting(!showSettint);
  };
  
    return (
      <>
      <div className={`settings-container ${showSettint ? 'visible' : ''}`}>
        <SettingsPage currentUser={currentUser}/>
      </div>
        <div className='menu'>
        <h3>Меню</h3>
        <hr className="separator" />
        <ln>
          <Link className='Link' to="/"><div>Главная</div></Link>
          <Link className='Link' to="/list/teachers"><div>Преподаватели</div></Link>
          <Link className='Link' to="/user/calendar"><div>Мой календарь</div></Link>
        </ln>
        
        <hr className="separator" />
        <div onClick={togglesSettting}>
          {showSettint ? 'Скрыть настройки' : 'Настройки'}
        </div>
      </div>
      </>
    );
  }
  
  export default Menu;