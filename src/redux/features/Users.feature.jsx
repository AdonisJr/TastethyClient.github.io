import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'users',
    initialState: {value: ''},
    reducers:{
        setUsers: (state, action) =>{
            state.value = action.payload;
        },
        addUsers: (state, action) =>{
            state.value.push(action.payload)
        },
        removeUser: (state, action)=>{
            state.value.splice(action.payload, 1);
        }
    }
})

export const {setUsers, addUsers, removeUser} = usersSlice.actions;
export default usersSlice.reducer;