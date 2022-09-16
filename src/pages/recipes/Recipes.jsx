import './recipes.css';
import React from 'react';
import HomeLogic from '../home/HomeLogic';
import { useSelector } from 'react-redux';
import List from '../../reusableComponent/listContainer/List';
import Navbar from '../../components/navbar/Navbar';


export default function Recipes() {

    const {handleNextSearch, handlePrevSearch} = HomeLogic();
  
    const recipes = useSelector((state)=> state.recipes.value);

  return (
    <div className='recipesContainer'>

        <header>
            <Navbar/>
        </header>
        
        <main>
            { 
                recipes == null ? '' :
                recipes.map((recipe, index) =>{
                    return <List title="Recipies" id= {index} recipe={recipe} action="Add"/>
                })
            }

            {
                recipes == null ? 'No record found' :
                <div className="paginate">
                    <button className='prev' onClick={handlePrevSearch}>Preview</button>
                    <button className='next' onClick={handleNextSearch}>Next</button>
                </div>
            }
        </main>
        

    </div>
  )
}
