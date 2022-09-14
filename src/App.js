import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Redirect from './components/redirect/Redirect';
import Favorites from './pages/favoriteRecipes/Favorites';
import Recipes from './pages/recipes/Recipes';
import Home from './pages/home/Home';

function App() {

    
  return (

    <div>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/login' element={ < Login/>} />
            <Route path='/Register' element={  < Register/>}/>
            <Route path='/redirect' element={<Redirect />} />
            <Route path='/recipes/favorites' element={<Favorites />} />
            <Route path='/search/recipes' element={<Recipes />} />
            
          </Routes>
    </div>
  );
}

export default App;
