import React from "react";
import './SearchForm.css';
import { ENTER_WORD_MESSAGE } from '../../../../constants/constants';
import classNames from 'classnames';

function SearchForm({ onClickRequestArray, openPopupsMessage, type, shortMovieRender}) {
  const [value, setValue] = React.useState({ text: '', short: 'off' });
  const [toggler, setToggler] = React.useState(false);
  const [error, setError] = React.useState('');
  const [isValid, setIsValid] = React.useState(true);
  const buttonClass = classNames(`searchForm__button`, {
    'searchForm__button_disabled': !isValid,
  });

  function handleChange(e) {
    e.preventDefault();
    const { value } = e.target;
    setValue((prev) => ({ ...prev, text: value }));
    setError(e.target.validationMessage);
  };

  function handleShortsToggler() {
    const valueNew = value.short === 'off' ? 'on' : 'off';
    setValue((prev) => ({ ...prev, short: valueNew }));
    setToggler(!toggler);
    return shortMovieRender(valueNew);
  };

  function onClickSearch() {
    if (error) {
      return openPopupsMessage(ENTER_WORD_MESSAGE);
    } 
    return onClickRequestArray(value);
  };

  React.useEffect(() => {
    if (type === 'allMovies') {
      const searchRequests = localStorage.getItem('searchRequests');
      const shortsFilter = localStorage.getItem('shortsFilter');
      if (!searchRequests && !shortsFilter) {
        setValue({ text: '', short: 'off' });
        setToggler(false);
        return;
      }
      setValue({ text: searchRequests, short: shortsFilter });
      setToggler(shortsFilter === 'on' ? true : false);
      return;
    }
  }, [type]);

  React.useEffect(() => {
    if (!value.text) {
      return setIsValid(false);
    }
    setIsValid(true);
  }, [value.text]);

  return (
    <section className='searchForm' >
      <form className='searchForm__form'>
        <div className='searchForm__container'>
          <input
            className='searchForm__input'
            type='text'
            value={value.text}
            onChange={handleChange}
            placeholder={`Фильм`}
            name='text'
            required
          />
          <button 
            className={buttonClass}
            type='button'
            onClick={(e) => onClickSearch(e)}
            disabled={!isValid}
            ></button>
        </div>
        <label className='searchForm__checkbox-label'>
          <input 
            className='searchForm__checkbox' 
            type='checkbox' 
            value={value.short}
            name='short'
            checked={toggler}
            onChange={handleShortsToggler}
          />
          <span className='searchForm__checkbox-fake'></span>
          Короткометражки
        </label>
      </form>
      {error && <span className='searchForm__span-error'>{error}</span>}
    </section>
  );
};

export default SearchForm;