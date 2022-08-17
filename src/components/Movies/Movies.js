import './Movies.css';
import Footer from '../Footer/Footer';
import Preloader from './components/Preloader/Preloader';
import SearchForm from './components/SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from '../Header/Header';
import { moviesArray } from '../../constants/moviesArray';

function Movies() {
const preloaderOpen = false;
return (
  <>
    <Header />
    <main className='movies'>
      <SearchForm />
      {preloaderOpen ? (
        <Preloader />
      ) : (
        <>
          <MoviesCardList moviesArray={moviesArray} type={'all'} />
          <div className='movies__more-container'>
            <button type='button' className='movies__button'>
              Ещё
            </button>
          </div>
        </>
      )}
    </main>
    <Footer />
  </>
  );
};

export default Movies;