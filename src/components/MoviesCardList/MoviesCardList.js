import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ moviesArray, type }) {
  return (
    <section className='moviesCardList'>
      <ul className='moviesCardList__list'>
        {moviesArray.map((movie) => {
          return <MoviesCard movie={movie} key={movie._id} type={type} />;
        })}
      </ul>
    </section>
  );
};

export default MoviesCardList;