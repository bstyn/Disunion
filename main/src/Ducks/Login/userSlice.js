import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        login: (state,action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        changeNickname: (state,action) => {
            state.user.nickname = action.payload
        }
    },
})

export const { login, logout, changeNickname } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

