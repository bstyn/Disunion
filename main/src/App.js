import React from 'react';
import './App.css';
import Sidebar from './Ducks/Sidebar/Sidebar';
import Chat from './Ducks/Chat/Chat'
import { selectUser } from './Ducks/Login/userSlice';
import { useSelector } from 'react-redux'
import Login from './Ducks/Login/Login';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Register from './Ducks/Register/Register';
import Servers from './Ducks/Servers/Servers';



function App() {
  const user = useSelector(selectUser)
  return (
    <Router>
      <div className='app'>
        {user ? (
        <Switch>
          <Route exact path='/login'><Redirect to='/' /></Route>
          <Route exact path='/'>
            <Servers />
            <Sidebar />
            <Chat />
          </Route>
          <Route path='/:id'>
            <Servers />
            <Sidebar />
            <Chat />
          </Route>
      </Switch>
        ): (
          <Switch>
            <Route exact path='/login'><Login /></Route>\
            <Route exact path='/register'><Register /></Route>
            <Route exact path='/'><Redirect to='/login' /></Route>
            <Route exact path='/:id'><Redirect to='/login' /></Route>
          </Switch>
        )}
      </div>
    </Router>
  );
}

export default App;
