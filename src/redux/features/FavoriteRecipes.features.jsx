import { createSlice } from "@reduxjs/toolkit";

export const favoriteRecipesSlice = createSlice({
    name: "favoriteRecipes",
    initialState: {value: []},
    reducers:{
        addFavoriteRecipe: (state, action) =>{
            state.value.push(action.payload);
        },
        setFavoriteRecipe: (state, action) =>{
            state.value = action.payload;
        },
    }
})

export const {addFavoriteRecipe, setFavoriteRecipe} = favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;