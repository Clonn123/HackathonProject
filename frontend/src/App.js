import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Header from './components/Headers/Header/Header.js';
import './css/App.css';
import './css/LightTheme.css'; 
import './css/DarkTheme.css';
import RegistrationForm from './components/Authorization/RegistrationForm/RegistrationForm.js';
import UserList from './components/User/UserList/UserList.js';
import LoginForm from './components/Authorization/LoginForm/LoginForm.js';
import Profile from './components/User/Profile/Profile.js';
import TeachersList from './components/User/UserList/TeachersList.js';
import AppointmentsList from './components/Appointments/AppointmentsList.js';
import Calendar from './components/Calendar/Calendar.js';
import CalendarTeacher from './components/Calendar/CalendarTeacher.js';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([
    { id: 1, name: 'Артем', surname: 'Полозников', username: 'Clonn123', password: 'Clonn123', email: 'art-clon@mail.ru', gender: "Мужчина", age: "21", role_id: 0 },
    { id: 2, name: 'Дмитрий', surname: 'Сальников', username: 'Lownay', password: 'Lownay', email: 'Lownay@mail.ru', gender: "Мужчина", age: "21", role_id: 0 }, 
  ]);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // Проверяем наличие токена в localStorage при загрузке компонента
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      // Вызываем функцию для автоматического входа пользователя
      autoLogin(accessToken);
    }
  }, []);
  
  const handleLogin = (accessToken, rememberMe) => {
    if (rememberMe) {
      localStorage.setItem('accessToken', accessToken);
    }
    // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    autoLogin(accessToken);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('accessToken');
    // delete axios.defaults.headers.common['Authorization'];
  };

  const autoLogin = async (accessToken) => {
    try {
      const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
      console.info(decodedToken)
      const user_id = decodedToken["user_id"];

      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${user_id}`);
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Ошибка:', error);
      handleLogout();
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.style.setProperty('--background-image', 'linear-gradient(135deg, #96816e, #96816E, #987F69)');
    } else {
      root.style.setProperty('--background-color', '#98C1D9');
    }
  }, [isDarkMode]);  
  
  return (
      <Router>
      <div className={`app-container ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <Header currentUser={currentUser} toggleTheme={toggleTheme} isDarkMode={isDarkMode} onLogout={handleLogout} />
        <div className='all_buddy'>
        <Routes>
          <Route path="/my_appointments" element={<AppointmentsList currentUser={currentUser}/>} />
          <Route path="/user/calendar" element={<Calendar currentUser={currentUser}/>} />
          <Route path="/list/teachers" element={<TeachersList />} />
          <Route path="/list/teachers/calendar/:id_teacher" element={<CalendarTeacher />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm users={users} onLogin={handleLogin} />} />
          <Route path="/" element={<UserList users={users} />} />
          {currentUser && <Route path="/profile" element={<Profile currentUser={currentUser} onLogout={handleLogout} />} />}
        </Routes>
        </div>   
      </div>
    </Router>
  );
}

export default App;
