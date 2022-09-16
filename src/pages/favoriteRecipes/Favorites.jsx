import React from 'react';
import './favorites.css';
import Navbar from '../../components/navbar/Navbar';
import { useSelector } from 'react-redux';
import List from '../../reusableComponent/listContainer/List';

export default function Favorites() {

  const favoriteRecipes = useSelector((state)=>state.favoriteRecipesData.value)

  if(favoriteRecipes == null) return <h1>No record found</h1>


  return (
    <div className='favoriteContainer'>
        <header>
            <Navbar/>
        </header>
        <main>
            { 
                favoriteRecipes.length === 0 ? 'No record found' :
                favoriteRecipes.map((favorite, index) =>{
                    return <List title="Recipies" id={index} recipe={favorite} action="Remove"/>
                })
            }
        </main>
    </div>
  )
}
