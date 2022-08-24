import React from 'react';
import './Main.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './components/Promo/Promo';
import AboutProject from './components/AboutProject/AboutProject';
import Techs from './components/Techs/Techs';
import AboutMe from './components/AboutMe/AboutMe';
function Main({ loggedIn }) {
  return (
    <>
    <Header loggedIn={loggedIn} />
    <main className='content'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
    <Footer />
    </>
  );
}

export default Main;