import React from 'react';
import './App.css';
import Sidebar from './Ducks/Sidebar/Sidebar';
import Chat from './Ducks/Chat/Chat'

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Chat />
    </div>
  );
}

export default App;
