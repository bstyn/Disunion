import { createSlice } from '@reduxjs/toolkit'

export const channelSlice = createSlice({
    name: 'channel',
    initialState: {
        channels: []
    },
    reducers: {
        addChannel: (state,action) => {
            state.channels = [...state.channels,action.payload]
        },
        deleteChannel: (state,action) => {
            state.channels = [...state.channels.filter(channel => channel.id !== action.payload)]
        },
        loadChannel: (state,action) => {
            state.channels = action.payload
        },
        editChannel: (state,action) => {
            state.channels.find(channel => channel.id === action.payload.id).channelName = action.payload.channelName
        }
    },
})

export const { addChannel, deleteChannel, loadChannel, editChannel} = channelSlice.actions;

export const selectChannel = (state) => state.channel.channels;

export default channelSlice.reducer;

