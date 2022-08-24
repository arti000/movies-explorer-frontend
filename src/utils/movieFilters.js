import { SHORT_MOVIE_DURATION } from '../constants/constants';
export const movieFilter = () => {
  const moviesArray = JSON.parse(localStorage.getItem('moviesArray'));
  const searchRequests = localStorage.getItem('searchRequests');
  const shortsFilter = localStorage.getItem('shortsFilter');

  const filteredMovies = moviesArray.filter(
    (movie) => movie.nameRU.toLowerCase().indexOf(searchRequests) >= 0
  );
  if (shortsFilter === 'on') {
    const shortsArray = filteredMovies.filter(
      (movie) => movie.duration < SHORT_MOVIE_DURATION
    );
    return shortsArray;
  } else return filteredMovies;
};

export const saveMovieFilter = (moviesArray, searchRequests, shortsFilter) => {
  const filteredMovies = moviesArray.filter(
    (movie) => movie.nameRU.indexOf(searchRequests) >= 0
  );
  if (shortsFilter === 'on') {
    const shortsArray = filteredMovies.filter(
      (movie) => movie.duration < SHORT_MOVIE_DURATION
    );
    return shortsArray;
  } else return filteredMovies;
};