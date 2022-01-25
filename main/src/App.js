import React from 'react';
import './App.css';
import Sidebar from './Ducks/Sidebar/Sidebar';
import Chat from './Ducks/Chat/Chat'
import { selectUser } from './features/userSlice';
import { useSelector } from 'react-redux'
import Login from './Ducks/Login/Login';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Register from './Ducks/Register/Register';



function App() {
  const user = useSelector(selectUser)
  return (
    <Router>
      <div className='app'>
        {user ? (
        <>
        <Sidebar />
        <Chat />
        </>
        ): (
          <Switch>
            <Route exact path='/login'><Login /></Route>
            <Route exact path='/register'><Register /></Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
