import { createSlice } from "@reduxjs/toolkit";

const invSlice = createSlice({
    name: 'inv',
    initialState: {
        invItem: [],
        isInv: false
    },
    reducers: {
        addItemInv(state, action) {
            state.invItem = action.payload
            state.isInv = true
        }, 
        delInvItem(state, action) {
            state.invItem = state.invItem.filter(i => i.id !== action.payload)
        },
        refInf(state) {
            state.invItem = []
        }
    }
})

export const { addItemInv, delInvItem, refInf } = invSlice.actions

export default invSlice.reducer