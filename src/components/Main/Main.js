import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './components/Promo/Promo';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';

function Main() {
  return (
    <main className='content'>
      <Header />
      <Promo />
      <AboutProject />
      <Techs />
      <Footer />
    </main>
  );
}

export default Main;