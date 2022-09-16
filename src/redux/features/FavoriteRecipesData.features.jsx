import { createSlice } from "@reduxjs/toolkit";

const favoriteRecipesDataSlice = createSlice({
    name: 'favoriteRecipesData',
    initialState: {value: []},
    reducers: {
        addFavoriteRecipesData: (state, action)=>{
            state.value.push(action.payload)
        },
        clearFavoriteRecipesData: (state, action)=>{
            state.value = [];
        },
        removeFavoriteRecipeData: (state, action)=>{
            state.value.splice(action.payload, 1);
        }
        
    } 
})

export const { addFavoriteRecipesData, clearFavoriteRecipesData, removeFavoriteRecipeData } = favoriteRecipesDataSlice.actions;
export default favoriteRecipesDataSlice.reducer;
