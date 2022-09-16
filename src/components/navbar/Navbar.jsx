import React,{ useEffect } from 'react';
import './navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import swal from 'sweetalert';

import * as authApi from '../../api/auth';
import * as recipeApi from '../../api/recipies';

import { logout, login } from '../../redux/features/User.features';
import { clearRecipes } from '../../redux/features/Recipes.features';
import { setFavoriteRecipe } from '../../redux/features/FavoriteRecipes.features';

import HomeLogic from '../../pages/home/HomeLogic';



export default function Navbar() {

  const navigate = useNavigate();
  const {keywords, handleSearchInput, handleSearch, handleFavoriteRecipes} = HomeLogic();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) =>state.user.value);
  const favoriteRecipes = useSelector((state)=>state.favoriteRecipes.value);
  
  const handleLogout = () =>{
    swal({
      title: "Are you sure you wan't to log out?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        dispatch(clearRecipes())
        localStorage.removeItem('token');
        dispatch(logout())

        swal("Successfully logout", {
          icon: "success",
        });
        setTimeout(()=>{
          navigate('/');
        },1500)
      } 
    });
  
  
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
   recipeApi.get(token)
      .then( response =>{
          dispatch(setFavoriteRecipe(response.data))
      }).catch(error =>{
          dispatch(setFavoriteRecipe(''))
      })
  
  },[])

  if(!userDetails)return <h1>'Loading'</h1>

  return (
    <div className='navbarContainer'>
      {/* Logo */}
        <div className="logo">
            {/* <h1 className='logo'>Taste<span>tify</span></h1> */}
            <a href="/"><h1 className='logo'>Taste<span>tify</span></h1></a>
        </div>

        {/* search  */}

        {
          userDetails !== 'none' ?
          <div className="search">
              <input 
                type="search" 
                placeholder='Keywords' 
                value={keywords} 
                onChange={handleSearchInput}
              />

              <button className='searchButton' onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              Search
              </button>
          </div> : ''
        } 

        {/* Sign in and logout buttons */}
        {
          userDetails === 'none' ?
            <div className="links">
              <Link className='signIn' to='/login'>Sign in</Link>
              <Link className='signUp' to='/register'>Sign up</Link>
            </div>
            :
            <div className="links">

                {/* LINK TO FAVORITE PAGE */}

                    <button className="favorite" onClick={handleFavoriteRecipes}>
                      <div className='container'>
                        <span className='count'>{favoriteRecipes.length}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                      </div>
                      
                      <span className='favLabel'>Favorite Dishes</span>
                    </button>
                    
                {/* END FAVORITE PAGE */}

              <h3 className='userName'>{userDetails.first_name + ", " + userDetails.last_name}</h3>
              <button onClick={handleLogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                  <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                </svg>
                Logout
              </button>
            </div>
        }
    </div>
  )
}
