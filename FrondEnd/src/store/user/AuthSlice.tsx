import {createSlice} from "@reduxjs/toolkit";
import type {User} from "../../Interface/User";


interface AuthState{
    user:User|null
}

const initialState:AuthState={
    user:null
}

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload
        },
        logoutUser:(state)=>{
            state.user = null
        },
        updateImage:(state,action)=>{
            if(state.user){
                state.user= {...state.user, imageUrl:action.payload.image}
            }
        }
    }
})

export const {login,logoutUser, updateImage} =AuthSlice.actions
export default AuthSlice.reducer