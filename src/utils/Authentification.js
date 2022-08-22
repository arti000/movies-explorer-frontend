// ----------------------------------------------------------------------------
//       Данный класс предназначен для аутентификации на сервере
// ----------------------------------------------------------------------------

class Authentification {
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

// ========================== Регистрация пользователя ========================

  registration = (email, password, name) => {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password, name }),
    }).then(this._handleResponse);
  }

// ========================== Авторизация пользователя ========================

  logIn = (email, password) => {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse)
  }
}

export const auth = new Authentification({
  url: "https://api.diploma.app.nomoredomains.sbs",
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Request-Credentials': true,
  }
});
