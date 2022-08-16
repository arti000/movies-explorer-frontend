import './AboutProject.css';

function AboutProject() {
  return (
    <article className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <ul className='about-project__list'>
        <li className='about-project__list-item'>
          <h3 className='about-project__list-item-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__list-item-subtitle'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__list-item'>
          <h3 className='about-project__list-item-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__list-item-subtitle'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='about-project__duration'>
        <li className='about-project__duration_backend'>
          <h3 className='about-project__duration-title about-project__duration-title_backend'>1 неделя</h3>
          <p className='about-project__duration-subtitle'>Back-end</p>
        </li>
        <li className='about-project__duration_frontend'>
          <h3 className='about-project__duration-title about-project__duration-title_frontend'>4 недели</h3>
          <p className='about-project__duration-subtitle'>Front-end</p>
        </li>
      </ul>
    </article>
  );
}

export default AboutProject;