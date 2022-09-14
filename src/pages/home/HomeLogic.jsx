import React, {useState, useEffect} from 'react';
import './home.css'
import { useNavigate } from 'react-router-dom';

import * as authApi from '../../api/auth';
import axios from 'axios';
import * as favoriteApi from '../../api/recipies';

import { login } from '../../redux/features/Users.features';

import {useDispatch, useSelector} from 'react-redux';
import { addRecipes } from '../../redux/features/Recipes.features';
import { addPaginate } from '../../redux/features/Paginate.features';
import { setFavoriteRecipe } from '../../redux/features/FavoriteRecipes.features';
import { addFavoriteRecipesData, clearFavoriteRecipesData } from '../../redux/features/FavoriteRecipesData.features';

export default function HomeLogic() {
  const navigate = useNavigate();    

  const dispatch = useDispatch();

  const {REACT_APP_SECRET_API_ID, REACT_APP_SECRET_API_KEY} = process.env;
  
  const pagination = useSelector((state)=> state.paginate.value)
  const userDetails = useSelector((state) =>state.user.value)
  const favoriteRecipes = useSelector((state)=>state.favoriteRecipes.value)

  const [keywords, setKeywords] = useState();
  
  const handleSearchInput = (e) =>{
      setKeywords(e.target.value)
  }

  const initalPage = `https://api.edamam.com/api/recipes/v2?type=public&q=${keywords}&app_id=${REACT_APP_SECRET_API_ID}&app_key=${REACT_APP_SECRET_API_KEY}`
 

  // SEARCH FUNCTION
  
  const handleSearch = async(e) =>{
    e.preventDefault();
    navigate('/search/recipes')
    await axios.get(initalPage)
    .then(response =>{
      dispatch(addRecipes(response.data.hits))
      console.log(response)
      dispatch(addPaginate({total: response.data.count, 
        from: response.data.from, to: response.data.to,
        prev: initalPage, next: response.data._links.next.href
        
      }))
    }).catch(error =>{
      dispatch(addRecipes(null))
    })
  }

  // HANDLE NEXT PAGINATION

  const handleNextSearch = async (e)=>{
      e.preventDefault();

      if(pagination.next){
        await axios.get(pagination.next)
        .then(response =>{
            dispatch(addRecipes(response.data.hits))
            dispatch(addPaginate({total: response.data.count, 
              from: response.data.from, to: response.data.to,
              prev: initalPage, next: response.data._links.next.href}))
        }).catch(error=>{
          console.log(error)
        })
      }
    }


    // HANDLE PREVIEW PAGINATION
    
    const handlePrevSearch = async (e)=>{
      e.preventDefault();
      if(pagination.prev){
        await axios.get(pagination.prev)
        .then(response =>{
            dispatch(addRecipes(response.data.hits))
            dispatch(addPaginate({total: response.data.count, 
              from: response.data.from, to: response.data.to,
              prev: initalPage, next: response.data._links.next.href}))
        }).catch(error=>{
          console.log(error)
        })
      }


    }
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';
  
    // SET USER DETAILS
    
    useEffect(()=>{
      const getUser = async ()=>{
        
        await authApi.getUserDetails(token)
        .then(response=>{
          dispatch(login(response.data.data))
          
        }).catch(error=>{
          dispatch(login('none'))
        })
      }
      getUser();
    },[])
  
    // SET FAVORITE RECIPES
  
    useEffect(()=>{
     favoriteApi.getFavoriteRecipes(token)
        .then( response =>{
            dispatch(setFavoriteRecipe(response.data))
        }).catch(error =>{
            dispatch(setFavoriteRecipe(''))
        })
    
    },[])

    // ADD FAVORITES DATA

    const handleFavoriteRecipes = (e) =>{
        e.preventDefault();
        dispatch(clearFavoriteRecipesData());
        const data = [];
        // console.log(favoriteRecipes)
        favoriteRecipes.map(recipe =>{
          axios.get(`https://api.edamam.com/api/recipes/v2/${recipe.recipe_id}?app_id=${REACT_APP_SECRET_API_ID}&app_key=${REACT_APP_SECRET_API_KEY}&type=public`)
              .then(response =>{
                console.log(response.data)
                dispatch(addFavoriteRecipesData(response.data))
                // dispatch(addFavoriteRecipesData(response.data.recipe))
              })
        })
        console.log(data)
        navigate('/recipes/favorites')
    }
  useEffect(()=>{
  
  }, [])
  
  
    if(!userDetails)return <h1>'Loading'</h1>

  return {keywords, setKeywords, handleSearch, 
    handleSearchInput, handleNextSearch, handlePrevSearch, handleFavoriteRecipes }

  
}
