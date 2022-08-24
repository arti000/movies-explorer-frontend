import React from 'react';
import './MoviesCard.css';
import { CurrentSavedMoviesContext } from '../../contexts/CurrentSavedMoviesContext';

function MoviesCard({ movie, type, onClickButtonMovie }) {
  const CurrentMovies = React.useContext(CurrentSavedMoviesContext);
  const { nameRU, duration, image } = movie;
  const movieData = CurrentMovies.filter((el) => el.movieId === movie._id);
  const isSave = movieData.length > 0;

  const setTimeFormat = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  const imageMovie = type === 'all' ? `https://api.nomoreparties.co${image.url}` : movie.image;
  const time = setTimeFormat(duration);
  
  return (
    <li className='moviesCard'>
      <img className='moviesCard__image' src={image} alt={nameRU} />
      <div className='moviesCard__info'>
        <div className='moviesCard__about'>
          <h1 className='moviesCard__title'>{nameRU}</h1>
        {type === 'all' ? (
          isSave ? (
            <button
              type='button'
              className='moviesCard__button moviesCard__button_type_active'
              onClick={() =>
                onClickButtonMovie(movie, 'delete', movieData[0]._id)
              }
            ></button>
          ) : (
            <button
              type='button'
              className='moviesCard__button moviesCard__button_type_disabled'
              onClick={() => onClickButtonMovie(movie, 'save', null)}
            ></button>
          )
        ) : (
          <button
            type='button'
            className='moviesCard__button moviesCard__button_type_close'
            onClick={() => onClickButtonMovie(movie._id)}
          ></button>
        )}
        </div>
        <a
        className='moviesCard__trailer'
        href={movie.trailerLink}
        target={'_blank'}
        rel='noopener noreferrer'
        >
        <img className='moviesCard__image' src={imageMovie} alt={nameRU} />
        </a>
        <p className='moviesCard__duration'>{time}</p>
      </div>
    </li>
  );
};

export default MoviesCard;