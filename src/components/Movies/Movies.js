import React from "react";
import './Movies.css';
import Footer from '../Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import SearchForm from './components/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import { moviesApi } from '../../utils/MoviesApi';
import { NOT_FOUND_MESSAGE, ERROR_SERVER_MESSAGE } from '../../constants/constants';
import { movieFilter } from '../../utils/movieFilters';

function Movies({ loggedIn, onClickSaveMovie, openPopupsMessage }) {
  const [preloaderOpen, setPreloaderOpen] = React.useState(false);
  const [filteredArrayMovies, setFilteredArrayMovies] = React.useState([]);
  const [isRender, setIsRender] = React.useState(true);

  function requestArray(searchResults) {
    setPreloaderOpen(true);
    const moviesArray = localStorage.getItem('moviesArray');
    if (!moviesArray) {
      moviesApi
        .getAllMovies()
        .then((movies) => {
          localStorage.setItem('moviesArray', JSON.stringify(movies));
          localStorage.setItem('searchRequests', searchResults.text.toLowerCase());
          localStorage.setItem('shortsFilter', searchResults.short);
          const arraySearch = movieFilter();
          return renderArray(arraySearch);
        })
        .catch(() => {
          openPopupsMessage(ERROR_SERVER_MESSAGE)
        })
    } else {
      localStorage.setItem('searchRequests', searchResults.text.toLowerCase());
      localStorage.setItem('shortsFilter', searchResults.short);
      const arraySearch = movieFilter();
      return renderArray(arraySearch);
    }
  };

  function shortMovieRender(searchResults) {
    localStorage.setItem('shortsFilter', searchResults);
    const arraySearch = movieFilter();
    return renderArray(arraySearch);
  };

  function renderArray(array) {
    if (array.length === 0) {
      openPopupsMessage(NOT_FOUND_MESSAGE);
      setIsRender(false);
      return
    } else {
      setFilteredArrayMovies(array);
      setIsRender(true);
      return setPreloaderOpen(false);
    }
  };

  React.useEffect(() => {
    const moviesArray = localStorage.getItem('moviesArray');
    if (!moviesArray) {
      setIsRender(false);
      return;
    } else {
      const arraySearch = movieFilter();
      return renderArray(arraySearch);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm
          onClickRequestArray={requestArray}
          openPopupsMessage={openPopupsMessage}
          type={'allMovies'}
          shortMovieRender={shortMovieRender}
        />
        {preloaderOpen ? (
          <Preloader />
        ) : (
          isRender &&
            <MoviesCardList 
            moviesArray={filteredArrayMovies} 
            type={'all'}
            onClickButtonMovie={onClickSaveMovie}
            />
        )}
        <div className='movies__space'></div>
      </main>
      <Footer />
    </>
    );
};

export default Movies;