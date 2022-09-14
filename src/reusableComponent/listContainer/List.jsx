import React, {useEffect, useState} from 'react';
import './list.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeLogic from '../../pages/home/HomeLogic';

import { addFavoriteRecipe } from '../../redux/features/FavoriteRecipes.features';
import { useDispatch, useSelector } from 'react-redux';

import * as recipeApi from '../../api/recipies';

export default function List(props) {


    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    
    const favoriteRecipes = useSelector((state)=>state.favoriteRecipes.value);

    const  {recipe, action, id} = props;

    console.log(recipe)

    const [isRecipeExist, setIsRecipeExist] = useState(false);

    const recipe_id = recipe._links.self.href.split('/')[6].split('?')[0]


    const data = recipe.recipe;

    const checkIfExist = (recipe) =>{
        favoriteRecipes.map(fav =>{
            if(fav.recipe_id == recipe) return setIsRecipeExist(true)

        }) 
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(action == 'Add'){
            
            await recipeApi.addFavoriteRecipes(accessToken, e.target.id)
           .then(response =>{
            console.log(response)
            const Alert = () => toast.success('Successfully added')
            Alert();
            dispatch(addFavoriteRecipe(e.target.id))
           }).catch(error=>{
            const Alert = () => toast.error(error.response.data.message)
            Alert();
           })
        }else{
            // will remove
        }
    }

    useEffect(()=>{
        
       checkIfExist(recipe_id)
    },[favoriteRecipes])
    

  return (
    
    <form className='listContainer' onSubmit={handleSubmit}
    key={recipe_id} id={recipe_id}>
        <div className="recipeInfo">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                rtl={false}
                pauseOnFocusLoss
                draggable
                theme='dark'
                // pauseOnHover
                />
            <div className="image">
                <img src={data.images.SMALL.url} alt="" />
            </div>
            <div className="info">
                <p className='title'>{data.label}</p>
                <p>{data.dishType}</p>
                <p>{`${data.dietLabels.join(', ')} ${data.healthLabels.join(', ')}`}</p>
            </div>

        </div>
        <h1 className='nutrients'>Nutrients</h1>
        <div className="caloriesInfo">
        
            <div className="left">
                <div className="container">
                    <span>Calories:</span>
                    <span>{data.calories.toFixed(3)}</span>             
                </div>
                
            </div>
            <div className="middle">
                
                    <div className="container">
                        <span>{data.digest[2].label}:</span>
                         <span>{data.digest[2].total.toFixed(3) + data.digest[2].unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.digest[1].label}:</span>
                         <span>{data.digest[1].total.toFixed(3) + data.digest[1].unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.digest[0].label}:</span>
                         <span>{data.digest[0].total.toFixed(3) + data.digest[0].unit}</span>
                    </div>

                </div>  
            <div className="end">
                    <div className="container">
                        <span>{data.totalNutrients.CA.label } : </span>
                        <span>{Math.round(data.totalNutrients.CA.quantity)+data.totalNutrients.CA.unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.totalNutrients.CHOCDF.label } : </span>
                        <span>{Math.round(data.totalNutrients.CHOCDF.quantity)+data.totalNutrients.CHOCDF.unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.totalNutrients.CHOLE.label } : </span>
                        <span>{Math.round(data.totalNutrients.CHOLE.quantity)+data.totalNutrients.CHOLE.unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.totalNutrients.FE.label } : </span>
                        <span>{Math.round(data.totalNutrients.FE.quantity)+data.totalNutrients.FE.unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.totalNutrients.K.label } : </span>
                        <span>{Math.round(data.totalNutrients.K.quantity)+data.totalNutrients.K.unit}</span>
                    </div>
                    <div className="container">
                        <span>{data.totalNutrients.MG.label } : </span>
                        <span>{Math.round(data.totalNutrients.MG.quantity)+data.totalNutrients.MG.unit}</span>
                    </div>
            </div>
        </div>
        
        <div className="buttons">
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
            {isRecipeExist ? 'Remove from list' : 'Favorite'}</button>
        </div>
    </form>
  )
}
