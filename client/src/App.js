
import './App.css';
import React from 'react';

import { BrowserRouter, Route, Routes} from 'react-router-dom';
import MainPage from './Components/MainPage';
import Header from './Components/Shared/Header';
import ShoppingCard from './Components/ShoppingCard';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
        <Routes>
          
          <Route path = '/' exact element = {<React.Fragment><MainPage/></React.Fragment>} /> 
          <Route path = '/basket' exact element = {<React.Fragment><ShoppingCard/></React.Fragment>} /> 
          
        </Routes>  
      </BrowserRouter>

    </div>
  );
}

export default App;
