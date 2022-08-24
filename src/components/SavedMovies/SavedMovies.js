import React from 'react';
import './SavedMovies.css';
import Preloader from '../Movies/components/Preloader/Preloader';
import SearchForm from '../Movies/components/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { CurrentSavedMoviesContext } from '../../context/CurrentSavedMoviesContext';
import { NOT_FOUND_MESSAGE } from '../../constants/constants';
import { saveMovieFilter } from '../../utils/movieFilters';

function SavedMovies({ loggedIn, onClickDeleteMovie, openPopupsMessage }) {
  const currentMovies = React.useContext(CurrentSavedMoviesContext);
  const [preloaderOpen, setPreloaderOpen] = React.useState(false);
  const [filteredArrayMovies, setFilteredArrayMovies] = React.useState(currentMovies);
  const [searchRequests, setSearchRequests] = React.useState('');
  
  function requestArray(searchResults) {
    setSearchRequests(searchResults.text.toLowerCase());
    setPreloaderOpen(true);
    const arraySearch = saveMovieFilter(
      currentMovies,
      searchResults.text.toLowerCase(),
      searchResults.short
    );
    return renderArray(arraySearch);
  };

  function shortMovieRender(searchResults) {
    const arraySearch = saveMovieFilter(currentMovies, searchRequests, searchResults);
    return renderArray(arraySearch);
  };

  function renderArray(array) {
    if (array.length === 0) {
      openPopupsMessage(NOT_FOUND_MESSAGE);
    } else {
      setFilteredArrayMovies(array);
    }
    return setPreloaderOpen(false);
  };

  React.useEffect(() => {
    setFilteredArrayMovies(currentMovies);
    return setSearchRequests('');
  }, [currentMovies]);


  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='savedMovies'>
        <SearchForm 
          onClickRequestArray={requestArray}
          openPopupsMessage={openPopupsMessage}
          type={'saveMovies'}
          onClickShortMovie={shortMovieRender}  
        />
        {preloaderOpen ? (
          <Preloader />
        ) : (
          currentMovies.length > 0 && (
            <>
              <MoviesCardList
                moviesArray={filteredArrayMovies} 
                type={'save'} 
                onClickButtonMovie={onClickDeleteMovie}
                />
              <div className='savedMovies__space'></div>
            </>
          )
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;