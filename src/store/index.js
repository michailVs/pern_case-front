import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';
import {persistReducer} from 'redux-persist'


const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user', 'item', 'inv', 'balance']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer
})

export const persistor = persistStore(store)
export default store