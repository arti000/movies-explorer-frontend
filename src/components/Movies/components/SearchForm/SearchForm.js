import './SearchForm.css';
function SearchForm() {
  return (
    <section className='searchForm'>
      <form className='form'>
        <div className='form__container'>
          <input
            className='form__input'
            type='text'
            placeholder={`Фильм`}
            required
          />
          <button className='form__button' type='button'></button>
        </div>
        <label className='checkbox__label'>
          <input className='checkbox' type='checkbox' value='short' />
          <span className='checkbox__fake'></span>
          Короткометражки
        </label>
      </form>
    </section>
  );
};

export default SearchForm;