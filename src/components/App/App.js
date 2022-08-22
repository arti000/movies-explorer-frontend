import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { auth } from '../../utils/Authentification';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import {
  REGISTRATION_MESSAGE,
  CONFLICT_ERROR,
  ERROR_SERVER_MESSAGE_SHORT,
  ERROR_MESSAGE_EMAIL_PASSWORD,
  UPDATE_DATA_MESSAGE,
  DELETE_MOVIE_MESSAGE,
  ERROR_MOVIES_VALID_DATA_MESSAGE,
  CONFLICT_ERROR_STATUS,
  UNAUTHORIZED_STATUS,
  BAD_REQUEST_STATUS,
} from '../../constants';


function App() {
// =============================== Блок констант ==============================

// ----------------------------- Для пользователя ----------------------------
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [authStatusMessage, setAuthStatusMessage] = React.useState('');

// ------------------------------ Для фильмов --------------------------------
  const [savedMovies, setSavedMovies] = React.useState([]);

// ----------------------------- Модальное окно ------------------------------
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

// -------------------------------- Прелоадер --------------------------------
  const [userAuth, setUserAuth] = React.useState(false);

  const navigate = useNavigate();

// ============================== Блок функций ===============================

// ------------------------- Регистрация пользователя ------------------------

  function userRegistration({ email, password, name }) {
    auth
      .registration(email, password, name)
      .then(() => {
      navigate('/signin');
      setAuthStatusMessage(REGISTRATION_MESSAGE);
      })
      .catch((err) => {
        if (err.message === CONFLICT_ERROR_STATUS) {
          setAuthStatusMessage(CONFLICT_ERROR);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
        }
      })
    }

// ------------------------- Авторизация пользователя ------------------------

  function handleLogin({ email, password }) {
    auth
    .logIn(email, password)
    .then((userData) => {
      setLoggedIn(true);
      setUserAuth(true);
      return userData;
    })
    .then((userData) => {
      navigate("/");
    })
    .catch((err) => {
      if (err.message === UNAUTHORIZED_STATUS) {
        setAuthStatusMessage(ERROR_MESSAGE_EMAIL_PASSWORD);
      } else {
        setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
      }
    })
    .finally(() => setUserAuth(false));
  }

// ---------------------- Выход пользователя с сервиса -----------------------

  function userSignOut() {
    setLoggedIn(false);
    navigate("/signin");
  }

// ------------------------ Функции модального окна --------------------------
function openPopup(message) {
  setAuthStatusMessage(message);
  setIsInfoToolTipOpen(true);
}

function closePopup() {
  setIsInfoToolTipOpen(false);
  setAuthStatusMessage('');
}

// ------------------------ Загрузка данных страницы -------------------------

React.useEffect(() => {
  if (loggedIn) {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if (err.message === UNAUTHORIZED_STATUS) {
          setAuthStatusMessage(ERROR_MESSAGE_EMAIL_PASSWORD);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
        }
      })
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
      })
      .catch((err) => {
        if (err.message === UNAUTHORIZED_STATUS) {
          setAuthStatusMessage(ERROR_MESSAGE_EMAIL_PASSWORD);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
        }
      })
  }
}, [loggedIn]);

// ----------------------- Обновление данных пользователя ----------------------

function handleUpdateUser( name, email ) {
  mainApi
  .setUserInfo( name, email )
    .then((res) => {
      setCurrentUser({ ...currentUser, name: res.name, email: res.email});
      setAuthStatusMessage(UPDATE_DATA_MESSAGE);
    })
    .catch((err) => {
      if (err.message === CONFLICT_ERROR_STATUS) {
        setAuthStatusMessage(CONFLICT_ERROR);
      } else {
        setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
      }
    })
  }

// ---------------------- Добавление фильма в сохраненные ---------------------

// ---------------------- Удаление фильма из сохраненных ----------------------

function handleCardDelete(movie) {
  mainApi
  .deleteMovie(movie._id)
  .then(() => {
    setSavedMovies((state) => state.filter((m) => m._id !== movie._id));
    setAuthStatusMessage(DELETE_MOVIE_MESSAGE);
  })
  .catch(() => setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT));
}

// =============================== Блок верстки ===============================
  return (
    <BrowserRouter>
      <div className='page'>
        <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/saved-movies' element={<SavedMovies />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/signin' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
