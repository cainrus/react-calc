import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calc from './components/Calc';

function App() {
  return (
    <div className="App">



      <header className="App-header" style={{ display: 'none' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <Calc ></Calc>
    </div>
  );
}

export default App;
