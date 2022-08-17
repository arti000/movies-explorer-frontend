import './SavedMovies.css';
import Preloader from '../Movies/components/Preloader/Preloader';
import SearchForm from '../Movies/components/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { moviesArray } from '../../constants/moviesArray';

function SavedMovies() {
  const preloaderOpen = false;
  const savedMovies = moviesArray.filter((movie) => movie.save);

  return (
    <>
      <Header />
      <main className='savedMovies'>
        <SearchForm />
        {preloaderOpen ? (
          <Preloader />
        ) : (
          <>
            <MoviesCardList moviesArray={savedMovies} type={'save'} />
            <div className='savedMovies__space'></div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;