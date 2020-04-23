import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './landing/landing';
import Register from './auth/register';
import Signin from './auth/signin';
import Welcome from './auth/entry';
import Home from './platform/pages/home';
import People from './platform/pages/people';
import Reservations from './platform/pages/reservations';
import Profile from './platform/pages/profile';
import Reserve from './platform/pages/reserve';

class Routes extends Component {
    constructor(props) {
        super(props);
        // store current user information
        this.state = {
            name: "",
            email: "",
            userID: "",
            token: ""
        };
    }

    render() {
        return (
            <Switch location={this.props.location}>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/signup" component={Register}/>
                <Route exact path="/signin" component={Signin}/>
                <Route exact path="/welcome" component={Welcome}/>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/people" component={People}/>
                <Route exact path="/reservations" component={Reservations}/>    
                <Route exact path="/profile" component={Profile}/>  
                <Route exact path="/reserve" component={Reserve}/>                            
            </Switch>
        );
    }
}

export default withRouter(Routes);
