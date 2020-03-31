import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import './loading.css';

const Container = styled.div` 
    width: 100vw;
    height: 100vh;
    text-align: center;
`;

const Logo = styled.div` 
    padding: 35vh 0 0 0;
    font-family: Lato;
    font-weight: 900;
    font-size: 80px;
    line-height: 60px;

    color: #2F80ED;
`;

const WelcomeMsg = styled.div`
    margin-top: 7.5vh;

    font-family: Lato;
    font-weight: 700;
    font-size: 50px;
    width: 100%;

    color: #4F4F4F;
`;

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            newUser: true
        };
    }

    componentDidMount() {
        window.setTimeout(() => {
            this.props.history.push('/home');
         }, 3000)
    }

    render() {
        return (
            <Container>
                <Logo>
                    COLD CALL
                </Logo>
                {this.state.newUser ? 
                    <WelcomeMsg>
                        Welcome 
                    </WelcomeMsg> 
                    : 
                    <WelcomeMsg>
                        Welcome Back
                    </WelcomeMsg>
                }
                <div className="lds-facebook">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </Container>
        )
    }
}

export default withRouter(Welcome);