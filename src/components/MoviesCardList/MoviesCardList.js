import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import More from './components/More/More';
import {
  WIDTH_1279,
  WIDTH_767,
  NUMBER_OF_CARDS_OVER_1279,
  NUMBER_OF_CARDS_OVER_660,
  NUMBER_OF_CARDS_LESS_660,
  ADD_NUMBER_CARD_4,
  ADD_NUMBER_CARD_2,
} from '../../constants';

function MoviesCardList({ moviesArray, type, onClickButtonMovie }) {
  const [counter, setCounter] = React.useState();
  const [moreCard, setMoreCard] = React.useState();

  function numberOfCards(width) {
    if (width > WIDTH_1279) {
      setCounter(NUMBER_OF_CARDS_OVER_1279);
      return setMoreCard(ADD_NUMBER_CARD_4);
    } else if (width > WIDTH_767) {
      setCounter(NUMBER_OF_CARDS_OVER_660);
      return setMoreCard(ADD_NUMBER_CARD_2);
    } else setCounter(NUMBER_OF_CARDS_LESS_660);
    return setMoreCard(ADD_NUMBER_CARD_2);
  };

  React.useEffect(() => {
    const width = window.innerWidth;
    numberOfCards(width);
  }, []);

  const addCounter = () => setCounter((...prev) => Number(prev) + moreCard);

  React.useEffect(() => {
    const setTimeOut = (e) => setTimeout(numberOfCards(e), 3000);
    window.addEventListener('resize', (e) =>
      setTimeOut(e.currentTarget.innerWidth)
    );
    return window.removeEventListener('resize', (e) =>
      setTimeOut(e.currentTarget.innerWidth)
    );
  }, []);

  return (
    <section className='moviesCardList'>
      <ul className='moviesCardList__list'>
      {type === 'all'
          ? moviesArray.slice(0, counter).map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie.id}
                  type={type}
                  onClickButtonMovie={onClickButtonMovie}
                />
              );
            })
          : moviesArray.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  key={movie._id}
                  type={type}
                  onClickButtonMovie={onClickButtonMovie}
                />
              );
            })}
      </ul>
      {type === 'all' && moviesArray.length > counter && (
        <More addCounter={addCounter} />
      )}
    </section>
  );
};

export default MoviesCardList;