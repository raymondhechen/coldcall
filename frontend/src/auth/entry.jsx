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