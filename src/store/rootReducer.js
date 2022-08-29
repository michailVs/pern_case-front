import { combineReducers } from "@reduxjs/toolkit";
import itemReducer from './itemStore'
import userReducer from './userStore'
import invReducer from './invStore'
import balanceReducer from './balanceStore'

export const rootReducer = combineReducers({
    item: itemReducer,
    user: userReducer,
    inv: invReducer,
    balance: balanceReducer
})