import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './components/Promo/Promo';

function Main() {
  return (
    <main className='content'>
      <Header />
      <Promo />
      <Footer />
    </main>
  );
}

export default Main;