import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        balance: 0
    },
    reducers: {
        addBalanc(state, action) {
            state.balance = action.payload
        }
    }
})

export const { addBalanc } = balanceSlice.actions

export default balanceSlice.reducer