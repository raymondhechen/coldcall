import React, { Component } from 'react';

import './arrow.css';
import ArrowIcon from './arrow.svg'

class Arrow extends Component {
    render() {
        return(
            <div className="arrow bounce">
                <img alt="arrow" src={ArrowIcon}/>
            </div>
        );
    }
}

export default Arrow;