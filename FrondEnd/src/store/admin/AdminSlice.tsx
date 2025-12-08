import {createSlice} from '@reduxjs/toolkit';
import type{User} from "../../Interface/User";

interface AdminState{
    admin:User|null
}
const initialState:AdminState={
    admin:null
}

const AdminSlice=createSlice({
    name:"admin",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.admin = action.payload
        },
        logoutUser:(state)=>{
            state.admin = null
        }
    }
})

export const {login,logoutUser}= AdminSlice.actions
export default AdminSlice.reducer