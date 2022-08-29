// ----------------------------------------------------------------------------
//       Данный класс предназначен для осуществления запросов к серверу
// ----------------------------------------------------------------------------

class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

// =========================== Обработчик ошибки ==============================

  _handleResponse = (res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
      return res.json();
  };

// ================== Запрос информации о сохраненных фильмах =================

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

// ===================== Запрос информации о пользователе =====================

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

// =============== Обновление информации профиля пользователе =================

  setUserInfo = ( name, email ) => {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify( name, email ),
    }).then(this._handleResponse);
  }

// ====================== Добавление фильма в сохраненные =====================

  saveMovie = (movie) => {
    console.log(movie)
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then(this._handleResponse);
  }

// ===================== Удаление фильма из сохраненных =======================

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

export const mainApi = new MainApi({
  url: 'https://api.diploma.app.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Credentials': true,
  }
});
