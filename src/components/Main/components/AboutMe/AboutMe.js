import './AboutMe.css';
import Portfolio from '../Portfolio/Portfolio';
import photo from '../../../../images/photo.jpg';

function AboutMe() {
  return (
        <section className='aboutMe'>
          <h2 className='aboutMe__title'>Студент</h2>
          <div className='aboutMe__content'>
            <div className='aboutMe__info'>
              <h3 className='aboutMe__name'>Виталий</h3>
              <p className='aboutMe__about'>Фронтенд-разработчик, 30 лет</p>
              <p className='aboutMe__description'>
              Я родился и живу в Саратове, закончил факультет экономики СГУ. 
              У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. 
              Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». 
              После того, как прошёл курс по веб-разработке, начал заниматься 
              фриланс-заказами и ушёл с постоянной работы.
              </p>
              <ul className='aboutMe__links'>
                <li className='aboutMe__link-item'>
                  <a
                    className='aboutMe__link'
                    target='_blank'
                    rel='noopener noreferrer'
                    href='http://facebook.com/'
                  >
                    Facebook
                  </a>
                </li>
                <li className='aboutMe__link-item'>
                  <a
                    className='aboutMe__link'
                    target='_blank'
                    rel='noopener noreferrer'
                    href='https://github.com/'
                  >
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <img className='aboutMe__photo' alt='Фото' src={photo} />
          </div>
          <Portfolio />
        </section>
      );
}

export default AboutMe;