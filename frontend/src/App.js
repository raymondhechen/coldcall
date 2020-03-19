import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Landing from './landing/landing';
import Authenticate from './auth/authenticate';

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
                        <Switch location={location}>
                            <Route exact path="/" component={Landing}/>
                            <Route exact path="/join" component={Authenticate}/>
                        </Switch>
                    </CSSTransition>
            </TransitionGroup>
            )} />
        </Router>
    );
}

export default App;
