import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Redirect from './components/redirect/Redirect';
import Favorites from './pages/favoriteRecipes/Favorites';
import Recipes from './pages/recipes/Recipes';
import Home from './pages/home/Home';
import SpecificRecipe from './pages/specificRecipe/SpecificRecipe';
import Admin from './admin/pages/Admin';
import axios from 'axios';

function App() {

  axios.defaults.baseURL ='http://localhost:3001';
    
  return (

    <div>
          <Routes>

            <Route path='/' element={<Home />} />
            <Route path='/login' element={ < Login/>} />
            <Route path='/Register' element={  < Register/>}/>
            <Route path='/redirect' element={<Redirect />} />
            <Route path='/recipes' element={<SpecificRecipe />} />
            <Route path='/recipes/favorites' element={<Favorites />} />
            <Route path='/search/recipes' element={<Recipes />} />
            <Route path='/admin' element={<Admin />} />
            
          </Routes>
    </div>
  );
}

export default App;
