import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h1 className='portfolio__title'>Портфолио</h1>
      <ul className='portfolio__links'>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/'
          >
            <h2 className='portfolio__link-title'>Статичный сайт</h2>
            <p className='portfolio__link-icon'>↗</p>
          </a>
        </li>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/'
          >
            <h2 className='portfolio__link-title'>Адаптивный сайт</h2>
            <p className='portfolio__link-icon'>↗</p>
          </a>
        </li>
        <li className='portfolio__link-item'>
          <a
            className='portfolio__link'
            target='_blank'
            rel='noopener noreferrer'
            href='https://github.com/'
          >
            <h2 className='portfolio__link-title'>Одностраничное приложение</h2>
            <p className='portfolio__link-icon'>↗</p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;