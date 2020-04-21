import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Routes from './Routes';

import './transitions.css'

function App() {
    return (
        <Router>

            <Route render={({location}) => (
                <TransitionGroup>
                    <CSSTransition 
                    key={location.key}
                    appear={true}
                    classNames="fade"
                    timeout={{enter: 300, exit: 100}}
                    >

                        <Routes props={location}/>

                    </CSSTransition>
            </TransitionGroup>
            )} />

        </Router>
    );
}

export default App;
