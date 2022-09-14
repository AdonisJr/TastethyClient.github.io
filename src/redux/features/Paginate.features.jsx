import { createSlice } from "@reduxjs/toolkit";

export const paginateSlice = createSlice({
    name: "paginate",
    initialState: {value: {
        prev: null,
        next: null
    }},
    reducers:{
        addPaginate: (state, action) =>{
            state.value = action.payload
        }
    }
})

export const {addPaginate} = paginateSlice.actions;
export default paginateSlice.reducer;