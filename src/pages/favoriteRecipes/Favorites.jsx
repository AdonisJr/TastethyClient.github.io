import React, {useState, useEffect} from 'react';
import './favorites.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import List from '../../reusableComponent/listContainer/List';

export default function Favorites() {

  const navigate = useNavigate();

  const favoriteRecipes = useSelector((state)=>state.favoriteRecipesData.value)

  if(favoriteRecipes == null) return <h1>No record found</h1>


  return (
    <div className='favoriteContainer'>
        <header>
            <Navbar/>
        </header>
        <main>
            { 
                favoriteRecipes == null ? '' :
                favoriteRecipes.map(favorite =>{
                    return <List title="Recipies" recipe={favorite} action="Remove"/>
                })
            }
        </main>
        <span onClick={()=>navigate('/')}>CLose</span>
    </div>
  )
}
