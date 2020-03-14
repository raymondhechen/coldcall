import React, { Component } from 'react';

import './arrow.css';
import ArrowIcon from './arrow.svg'

class Arrow extends Component {
    render() {
        return(
            <div class="arrow bounce">
                <img src={ArrowIcon}/>
            </div>
        );
    }
}

export default Arrow;