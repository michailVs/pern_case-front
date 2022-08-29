import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        isAuth: false
    },
    reducers: {
        addUser(state, action) {
            state.users.push(action.payload)
            state.isAuth = true
        }
    }
})

export const { addUser } = userSlice.actions

export default userSlice.reducer