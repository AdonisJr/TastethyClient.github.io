import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/features/Users.features';
import recipesReducer from '../redux/features/Recipes.features';
import paginateReducer from '../redux/features/Paginate.features';
import favoriteRecipesReducer from './features/FavoriteRecipes.features';
import favoriteRecipesDataReducer from './features/FavoriteRecipesData.features';

export const store = configureStore({
    reducer:{
        user: userReducer,
        recipes: recipesReducer,
        paginate: paginateReducer,
        favoriteRecipes: favoriteRecipesReducer,
        favoriteRecipesData: favoriteRecipesDataReducer
    }
})