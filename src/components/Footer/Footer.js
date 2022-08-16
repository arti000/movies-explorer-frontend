import './Footer.css';
function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__info'>
      <p className="footer__copyright">&copy; 2022</p>
      <ul className='footer__list'>
        <li className='footer__list-item'>
          <a
              className='footer__link'
              target='_blank'
              rel='noreferrer noopener'
              href='https://practicum.yandex.ru/'
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className='footer__list-item'>
          <a
              className='footer__link'
              target='_blank'
              rel='noreferrer noopener'
              href='https://github.com/'
          >
            Github
          </a>
        </li>
        <li className='footer__list-item'>
          <a
              className='footer__link'
              target='_blank'
              rel='noreferrer noopener'
              href='http://facebook.com/'
          >
            Facebook
          </a>
        </li>
      </ul>
      </div>
    </footer>
  );
}

export default Footer;