import './Promo.css';
import { HashLink as Link } from 'react-router-hash-link';
import banner from '../../../../images/banner.svg';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__content'>
        <img className='promo__image' src={banner} alt='logo'></img>
        <div className='promo__text'>
          <h1 className='promo__title'>
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className='promo__subtitle'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
        </div>
      </div>
      <Link className='promo__link' to='/#about-project'>Узнать больше</Link>
    </section>
  );
}

export default Promo;