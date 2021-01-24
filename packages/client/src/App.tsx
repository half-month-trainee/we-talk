import React from 'react';
import logo from './logo.svg';
import './App.css';
import { add, HelloWorld } from "@we-talk/common";
import tw from "twin.macro";


const Input = tw.input`border hover:border-black bg-yellow-300`

function App() {
  const a : HelloWorld = {
    meme: add(1, 2)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <Input />
          Edit <code>src/App.tsx {a.meme}</code> and save to reload.
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
    </div>
  );
}

export default App;
