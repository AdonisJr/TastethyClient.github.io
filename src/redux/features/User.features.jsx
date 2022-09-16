import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {value: null},
    reducers: {
        login: (state, action) =>{
            // write all the code for adding the user
            state.value = action.payload
        },
        logout:(state, action) =>{
            state.value = 'none';
        }
    }
})

export const {login, logout} = userSlice.actions;
export default userSlice.reducer