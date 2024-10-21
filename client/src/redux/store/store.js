import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import postReducer from "../features/postSlice"
import chatReducer from "../features/chatSlice"
import socketReducer from "../features/socketSlice"


const persistConfig = {
    key: 'root',
    storage,
    version:1,
    // whitelist: ['auth', 'posts', 'chat'], // Persist only auth, posts, and chat slices

  }

const rootReducer = combineReducers({
    auth:authReducer,
    posts:postReducer,
    chat:chatReducer,
    socket:socketReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
                // ignoredPaths: ['socket'],
            }
        })
})


export default store