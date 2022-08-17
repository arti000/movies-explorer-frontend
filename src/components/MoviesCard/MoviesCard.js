import './MoviesCard.css';
function MoviesCard({ movie, type }) {
  const { nameRU, duration, image, save } = movie;

  const setTimeFormat = (time) => {
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return hours > 0 ? `${hours}ч ${minutes}м` : `${minutes}м`;
  };

  const time = setTimeFormat(duration);
  
  return (
    <li className='moviesCard'>
      <img className='moviesCard__image' src={image} alt={nameRU} />
      <div className='moviesCard__info'>
        <div className='moviesCard__about'>
          <h1 className='moviesCard__title'>{nameRU}</h1>
        {type === 'all' ? (
          save ? (
            <button
              type='button'
              className='moviesCard__button moviesCard__button_type_active'
            ></button>
          ) : (
            <button
              type='button'
              className='moviesCard__button moviesCard__button_type_disabled'
            ></button>
          )
        ) : (
          <button
            type='button'
            className='moviesCard__button moviesCard__button_type_close'
          ></button>
        )}
        </div>
        <p className='moviesCard__duration'>{time}</p>
      </div>
    </li>
  );
};

export default MoviesCard;