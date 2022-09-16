import React, {useState} from 'react';
import './list.css';
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../modal/Modal';

import { removeFavoriteRecipeData } from '../../redux/features/FavoriteRecipesData.features';
import { addFavoriteRecipe, setFavoriteRecipe } from '../../redux/features/FavoriteRecipes.features';
import { setSelectedRecipe } from '../../redux/features/SelectedRecipe.features';
import { useDispatch, useSelector } from 'react-redux';


import * as recipeApi from '../../api/recipies';

export default function List(props) {


    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    
    const favoriteRecipes = useSelector((state)=>state.favoriteRecipes.value);

    const  {recipe, action, id} = props;

    const recipe_id = recipe._links.self.href.split('/')[6].split('?')[0]

    const data = recipe.recipe;

    console.log()
    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(action === 'Add'){
        
            await recipeApi.add(accessToken, e.target.id)
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

            const recipeDetails = {
                accessToken: accessToken,
                recipe_id: e.target.id
            }
            await recipeApi.remove(recipeDetails)
            .then(response=>{
                
                const Alert = () => toast.success('Successfully removed')
                Alert();
                setTimeout(()=>{
                    dispatch(removeFavoriteRecipeData(id))
                    const newFavoriteRecipes = favoriteRecipes.filter(data => data.recipe_id !== e.target.id)
                    dispatch(setFavoriteRecipe(newFavoriteRecipes))
                },2000)
                
            })
        }
    }

    // OPEN AND CLOSING MODAL

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalTogle = ()=>{
        setIsModalOpen(!isModalOpen)
        dispatch(setSelectedRecipe(data))
    }
    
  return (
    
    <form className='listContainer' onClick={(e)=>console.log('wewe')} onSubmit={handleSubmit}
    key={recipe_id} id={recipe_id}>
        <ToastContainer
                position="top-right"
                autoClose={1800}
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
        <div className="head">
              <div className="image">
                  <img src={data.images.SMALL.url} alt="" />
              </div>
              <div className="info">  
                  <p className="recipeName">
                      {data.label}
                  </p>
                  <p className="dishType">
                      {data.dishType}
                  </p>
                  <p className="dietLabels">
                      {`${data.dietLabels.join(', ')} ${data.healthLabels.join(', ')}`}
                  </p>
              </div>
          </div>
          <div className="body">
              <div className="nutrients">
                  Nutrients
              </div>
              <div className="nutrientsValue">
                  <div className="left">
                      <div className="container">
                        <p className='calories'>Calories:</p>
                        <p className='caloriesValue'>{data.calories.toFixed(3)}</p>             
                      </div>
                  </div>
                 <div className="middle">
                    <div className="container">
                            <p className='digest'>{data.digest[2].label}:</p>
                            <p className='value'>{data.digest[2].total.toFixed(3) + data.digest[2].unit}</p>
                        </div>
                        <div className="container">
                            <p  className='digest'>{data.digest[1].label}:</p>
                            <p className='value'>{data.digest[1].total.toFixed(3) + data.digest[1].unit}</p>
                        </div>
                        <div className="container">
                            <p  className='digest'>{data.digest[0].label}:</p>
                            <p className='value'>{data.digest[0].total.toFixed(3) + data.digest[0].unit}</p>
                        </div>
                  </div>
                  <div className="end">
                      <div className="container">
                          <p className='totalNutrients'>{data.totalNutrients.CA.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CA.quantity)+data.totalNutrients.CA.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.CHOCDF.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CHOCDF.quantity)+data.totalNutrients.CHOCDF.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.CHOLE.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.CHOLE.quantity)+data.totalNutrients.CHOLE.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.FE.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.FE.quantity)+data.totalNutrients.FE.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.K.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.K.quantity)+data.totalNutrients.K.unit}</p>
                      </div>
                      <div className="container">
                          <p  className='totalNutrients'>{data.totalNutrients.MG.label } : </p>
                          <p className='value'>{Math.round(data.totalNutrients.MG.quantity)+data.totalNutrients.MG.unit}</p>
                      </div>  
                  </div> 
              </div>
          </div>
          <div className="footer">
          <button>
                {
                    action === 'Add' ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                            :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-excel-fill" viewBox="0 0 16 16">
                            <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM5.884 4.68 8 7.219l2.116-2.54a.5.5 0 1 1 .768.641L8.651 8l2.233 2.68a.5.5 0 0 1-.768.64L8 8.781l-2.116 2.54a.5.5 0 0 1-.768-.641L7.349 8 5.116 5.32a.5.5 0 1 1 .768-.64z"/>
                        </svg>
                }
                
                {action === 'Remove' ? 'Remove from list' : 'Favorite'}
            </button>
            <span onClick={handleModalTogle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-square-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm8.93 4.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                View Other info
            </span>
              <Modal handleModalTogle={handleModalTogle} open={isModalOpen} data={data} />
            
          </div>
        
        <div className="buttons">
            
        </div>
    </form>
  )
}
