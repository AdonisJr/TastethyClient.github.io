import { createSlice } from "@reduxjs/toolkit";

const selectedRecipeSlice = createSlice({
    name: 'selectedRecipe',
    initialState: {value: ''},
    reducers: {
        setSelectedRecipe: (state, action)=>{
            state.value = action.payload;
        }
    }
})

export const {setSelectedRecipe} = selectedRecipeSlice.actions;
export default selectedRecipeSlice.reducer;