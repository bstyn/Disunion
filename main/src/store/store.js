import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Ducks/Login/userSlice'
import appReducer from '../Ducks/Sidebar/appSlice'
import serverReducer from '../Ducks/Servers/serverSlice'
import channelReducer from '../Ducks/Sidebar/channelSlice'
import messageReducer from '../Ducks/Chat/messagesSlice'
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    server: serverReducer,
    channel: channelReducer,
    message: messageReducer,
  },thunk,
});
