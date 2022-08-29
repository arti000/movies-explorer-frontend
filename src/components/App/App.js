import React from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from "../Movies/Movies";
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import './App.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { CurrentSavedMoviesContext } from '../../context/CurrentSavedMoviesContext';
import { mainApi } from '../../utils/MainApi';
import { auth } from '../../utils/Authentification';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
} from '../../constants/constants';


function App() {
// =============================== Блок констант ==============================

// ----------------------------- Для пользователя ----------------------------
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '' });
  const [authStatusMessage, setAuthStatusMessage] = React.useState('');

// ------------------------------ Для фильмов --------------------------------
  const [savedMovies, setSavedMovies] = React.useState([]);

// ----------------------------- Модальное окно ------------------------------
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);

  const [userAuth, setUserAuth] = React.useState(true);

  const navigate = useNavigate();

// ============================== Блок функций ===============================

// ------------------------- Регистрация пользователя ------------------------

  function userRegistration({ email, password, name }) {
    setAuthStatusMessage('');
    setUserAuth(false);

    auth
      .registration(email, password, name)
      .then(() => {
        setUserAuth(true);
        setAuthStatusMessage(REGISTRATION_MESSAGE);
        handleLogin({email, password})
      })
      .catch((err) => {
        if (err.message === CONFLICT_ERROR_STATUS) {
          setAuthStatusMessage(CONFLICT_ERROR);
          setUserAuth(false);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
          setUserAuth(false);
        }
      })
    }

// ------------------------- Авторизация пользователя ------------------------

  function handleLogin({ email, password }) {
    setAuthStatusMessage('')
    setUserAuth(false);

    auth
      .logIn(email, password)
      .then((userData) => {
        localStorage.setItem('loggedInSession', true)
        checkToken()
        navigate('/movies')
        return userData;
      })
      .catch((err) => {
        if (err.message === UNAUTHORIZED_STATUS) {
          setAuthStatusMessage(ERROR_MESSAGE_EMAIL_PASSWORD);
          setUserAuth(false);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
          setUserAuth(false);
        }
      })
      .finally(() => setUserAuth(false));
  }

// ---------------------- Выход пользователя с сервиса -----------------------

  function userSignOut() {
    localStorage.removeItem('moviesArray');
    localStorage.removeItem('searchRequests');
    localStorage.removeItem('shortsFilter');
    localStorage.removeItem('loggedInSession')
    setCurrentUser({});
    setSavedMovies([]);
    setLoggedIn(false);
    auth
      .logOut()
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
        setUserAuth(false);
      })
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

// ----------------------------- Проверка токена -----------------------------
function checkToken() {
  const storedLoggedInStatus = localStorage.getItem('loggedInSession');
  if(storedLoggedInStatus) {
    return setLoggedIn(true)
  } else {
    return setLoggedIn(false)
  }
}

React.useEffect(() => {
  checkToken()
})

React.useEffect(() => {
  if(loggedIn) {
    mainApi
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true)
      })
      .catch((err) => {
        if (err.message === UNAUTHORIZED_STATUS) {
          setAuthStatusMessage(ERROR_MESSAGE_EMAIL_PASSWORD);
          setUserAuth(false);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
          setUserAuth(false);
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
          setUserAuth(false);
        } else {
          setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
          setUserAuth(false);
        }
      })
  }
}, [loggedIn]);

// ----------------------- Обновление данных пользователя ----------------------

function handleUpdateUser( name, email ) {
  mainApi
  .setUserInfo( name, email )
    .then((res) => {
      setUserAuth(false);
      setAuthStatusMessage(UPDATE_DATA_MESSAGE);
      setCurrentUser({ ...currentUser, name: res.name, email: res.email});
    })
    .catch((err) => {
      if (err.message === CONFLICT_ERROR_STATUS) {
        setAuthStatusMessage(CONFLICT_ERROR);
        setUserAuth(false);
      } else {
        setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
        setUserAuth(false);
      }
    })
  }

// ---------------------- Добавление фильма в сохраненные ---------------------

function handleMovieSave(movie, status, id) {
  if (status === 'delete') {
    handleMovieDelete(id);
    return;
  }
  const movieNew = {
    ...movie,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    movieId: movie.id,
  };
  delete movieNew.id;
  delete movieNew.created_at;
  delete movieNew.updated_at;
  
  mainApi
  .saveMovie(movieNew)
  .then((movie) => {
    setSavedMovies((prev) => [...prev, movie]);
  })
  .catch((err) => {
    if (err.message === BAD_REQUEST_STATUS) {
      setAuthStatusMessage(ERROR_MOVIES_VALID_DATA_MESSAGE);
      setIsInfoToolTipOpen(true);
    } else {
      setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT);
      setIsInfoToolTipOpen(true);
    }
  });
}

// ---------------------- Удаление фильма из сохраненных ----------------------

function handleMovieDelete(id) {
  mainApi
  .deleteMovie(id)
  .then(() => {
    setSavedMovies((state) => state.filter((m) => m._id !== id));
    setAuthStatusMessage(DELETE_MOVIE_MESSAGE);
  })
  .catch(() => {
  setAuthStatusMessage(ERROR_SERVER_MESSAGE_SHORT)
  setUserAuth(false);
  })
}

// =============================== Блок верстки ===============================
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentSavedMoviesContext.Provider value={savedMovies}>
          <div className='page'>
            <Routes>
              <Route exact path='/' element={<Main loggedIn={loggedIn}/>} />
              <Route 
                path='/movies' 
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Movies
                      loggedIn={loggedIn}
                      onClickSaveMovie={handleMovieSave}
                      openPopupsMessage={openPopup}
                    />
                  </ProtectedRoute>
                }  
              />
              <Route 
                path='/saved-movies' 
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <SavedMovies 
                      loggedIn={loggedIn}
                      onClickDeleteMovie={handleMovieDelete}
                      openPopupsMessage={openPopup}
                      currentMovies={savedMovies}
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path='/profile' 
                element={
                  <ProtectedRoute loggedIn={loggedIn}>
                    <Profile
                      loggedIn={loggedIn}
                      onSignOut={userSignOut}
                      onClickUpdateProfile={handleUpdateUser}
                      authStatusMessage={authStatusMessage}
                      userAuth={userAuth}
                    />
                  </ProtectedRoute>
                }
              />
              <Route 
                path='/signin' 
                element={
                  loggedIn ? (
                    <Navigate to='/movies' />
                  ) : (
                    <Login
                      onLogin={handleLogin}
                      authStatusMessage={authStatusMessage}
                      userAuth={userAuth}
                    />
                  )
                }
              />
              <Route
                path='/signup' 
                element={
                  loggedIn ? (
                    <Navigate to='/movies' />
                  ) : (
                    <Register
                      onRegister={userRegistration}
                      authStatusMessage={authStatusMessage}
                      userAuth={userAuth}
                    />
                  )
                }
              />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
            <InfoToolTip
                isOpen={isInfoToolTipOpen}
                onClose={closePopup}
                userAuth={userAuth}
                authStatusMessage={authStatusMessage}
            />
          </div>
      </CurrentSavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
