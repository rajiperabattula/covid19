import './App.css';
import React from 'react';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import About from './pages/About';
import StateSpecific from './pages/StateSpecific';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './scss/common.scss';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/state/:stateCode' element={<StateSpecific/>}/>
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
