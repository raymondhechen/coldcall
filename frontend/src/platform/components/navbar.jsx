import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './navbar.css';

class NavBar extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to="/reservations"><li>Reservations</li></Link>
                    <Link to="/people"><li>People</li></Link>
                </ul>
            </div>
        );
    }
}

export default NavBar;

