import './More.css';

function More({ addCounter }) {
  return (
    <section className='more'>
      <button type='button' className='more__button' onClick={addCounter}>
        Ещё
      </button>
    </section>
  );
};

export default More;