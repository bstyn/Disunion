import { createSlice } from '@reduxjs/toolkit'

export const serverSlice = createSlice({
    name: 'server',
    initialState: {
        servers: []
    },
    reducers: {
        addServer: (state,action) => {
            state.servers = [...state.servers,action.payload]
        },
        loadServer: (state,action) => {
            state.servers = action.payload
        },
        deleteServer: (state,action) => {
            state.servers = [...state.servers.filter(server => server.id !== action.payload.id)]
        },
        joinServer: (state,action) => {
            state.servers.find(server => server.id === action.payload.server_id).users.push(action.payload.id)
        }
    },
})

export const { addServer, deleteServer, joinServer, loadServer } = serverSlice.actions;

export const selectServer = (state) => state.server.servers;

export default serverSlice.reducer;

