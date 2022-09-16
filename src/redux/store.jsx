import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../redux/features/User.features';
import recipesReducer from '../redux/features/Recipes.features';
import paginateReducer from '../redux/features/Paginate.features';
import favoriteRecipesReducer from './features/FavoriteRecipes.features';
import favoriteRecipesDataReducer from './features/FavoriteRecipesData.features';
import SelectedRecipeReducer from './features/SelectedRecipe.features';
import usersReducer from '../redux/features/Users.feature';
import activePageReducer from '../redux/features/ActivePage.features';

export const store = configureStore({
    reducer:{
        user: userReducer,
        users: usersReducer,
        recipes: recipesReducer,
        paginate: paginateReducer,
        favoriteRecipes: favoriteRecipesReducer,
        favoriteRecipesData: favoriteRecipesDataReducer,
        selectedRecipe: SelectedRecipeReducer,
        activePage: activePageReducer
    }
})