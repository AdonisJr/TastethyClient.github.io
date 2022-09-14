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
    } 
})

export const {addFavoriteRecipesData, clearFavoriteRecipesData} = favoriteRecipesDataSlice.actions;
export default favoriteRecipesDataSlice.reducer;
