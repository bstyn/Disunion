import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state,action) => {
            state.messages = [...state.messages,action.payload]
        },
        deleteMessage: (state,action) => {
            state.messages = [...state.messages.filter(message => message.id !== action.payload)]
        },
        loadMessage: (state,action) => {
            state.messages = action.payload
        },
        editMessage: (state,action) => {
            state.messages.find(message => message.id === action.payload.id).text = action.payload.text
        }
    },
})

export const { addMessage, deleteMessage,loadMessage,editMessage } = messageSlice.actions;

export const selectMessage = (state) => state.message.messages;

export default messageSlice.reducer;
