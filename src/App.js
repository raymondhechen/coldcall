import React from 'react';
import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <div className="App">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">ColdCall</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="#features">Listings</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Test 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Test 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Test 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Test 4</NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav>
            <Nav.Link eventKey={2} href="#memes">
                My Profile
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    </div>
  );
}

export default App;
