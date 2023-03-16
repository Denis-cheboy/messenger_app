import { apiSlice } from "../appApi/apiSlice";
import authReducer from "./authSlice"
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer"
import storage from "redux-persist/lib/storage"
import { configureStore } from "@reduxjs/toolkit";

const reducers=combineReducers({
    auth:authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer
})

const config={
    key:"root",
    storage,
    blackList:[apiSlice.reducerPath]
}

const persistedReducer=persistReducer(config,reducers)

export const store=configureStore({
    reducer:persistedReducer,
    middleware:getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false}).concat(apiSlice.middleware)
})
