import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../Main/Main';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='page'>
        <Routes>
          <Route exact path='/' element={<Main />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
