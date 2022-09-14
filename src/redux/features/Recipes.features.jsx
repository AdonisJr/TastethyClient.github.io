import {createSlice} from '@reduxjs/toolkit';

export const recipesSlice = createSlice({
    name: "recipes",
    initialState: {value: null},
    reducers:{
        addRecipes: (state, action)=>{
            state.value = action.payload
        },
        clearRecipes: (state, action)=>{
            state.value = null;
        }
    }
})

export const {addRecipes,clearRecipes} = recipesSlice.actions;
export default recipesSlice.reducer;