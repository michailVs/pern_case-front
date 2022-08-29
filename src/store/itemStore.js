import { createSlice } from '@reduxjs/toolkit'

const itemSlice = createSlice({
    name: 'item',
    initialState: {
        items: []
    },
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload)
        },
        deletItem(state, action) {
            state.items = []
        }
    }
})

export const { addItem, deletItem } = itemSlice.actions

export default itemSlice.reducer