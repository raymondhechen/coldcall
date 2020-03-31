import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Landing from './landing/landing';
import Register from './auth/register';
import Signin from './auth/signin';
import Welcome from './auth/entry';
import Home from './platform/pages/home'
import People from './platform/pages/people'
import Reservations from './platform/pages/reservations'

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
                            <Route exact path="/signup" component={Register}/>
                            <Route exact path="/signin" component={Signin}/>
                            <Route exact path="/welcome" component={Welcome}/>
                            <Route exact path="/home" component={Home}/>
                            <Route exact path="/people" component={People}/>
                            <Route exact path="/reservations" component={Reservations}/>                            
                        </Switch>

                    </CSSTransition>
            </TransitionGroup>
            )} />

        </Router>
    );
}

export default App;
