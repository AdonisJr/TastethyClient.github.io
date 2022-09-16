import { createSlice } from "@reduxjs/toolkit";

const activePageSlice = createSlice({
    name: 'activePage',
    initialState: {value: 0},
    reducers: {
        setActivePage: (state, action)=>{
            state.value = action.payload;
        }
    }
})

export const {setActivePage} = activePageSlice.actions;
export default activePageSlice.reducer;