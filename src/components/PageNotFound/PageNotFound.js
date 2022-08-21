import './PageNotFound.css';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  };

  return (
    <section className='pageNotFound'>
      <h1 className='pageNotFound__title'>404</h1>
      <p className='pageNotFound__subtitle'>Страница не найдена</p>

      <p className='pageNotFound__link' onClick={handleClick}>
        Назад
      </p>
    </section>
  );
}

export default PageNotFound;