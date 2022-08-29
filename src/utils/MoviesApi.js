// ----------------------------------------------------------------------------
//    Данный класс предназначен для осуществления запросов к BeatfilmMovies
// ----------------------------------------------------------------------------

class MoviesApi {
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

// =========================== Запрос списка фильмов ==========================

  getAllMovies() {
    return fetch(this._url, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

}

export const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});
