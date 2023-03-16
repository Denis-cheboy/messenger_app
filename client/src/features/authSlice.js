import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setCredentials:(state,{payload})=>{
            console.log(payload)
            state.currentUser=payload
        },
        addNotifications:(state,{payload})=>{
            if(state.currentUser.notifications[payload]){
                state.currentUser.notifications[payload]=state.currentUser.notifications[payload]+1
            }
            else{
                state.currentUser.notifications[payload]=1
            }
        },
        resetNotification:(state,{payload})=>{
            delete state.currentUser?.notifications[payload]
        },
        logout:(state,{payload})=>{
            state.currentUser=null
        }
    }
})

export const {setCredentials,addNotifications,resetNotification,logout}=authSlice.actions
export const selectCurrentUser=(state)=>state.auth.currentUser
export default authSlice.reducer