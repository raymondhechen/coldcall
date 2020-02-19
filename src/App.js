import React from 'react';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>COLD CALL</h1>
        <br></br>
        <DropdownButton id="dropdown-basic-button" title="Choose Sector">
            <Dropdown.Item href="#/action-1">Finance</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Technology</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Business</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Medicine</Dropdown.Item>
        </DropdownButton>
      </header>
    </div>
  );
}

export default App;
