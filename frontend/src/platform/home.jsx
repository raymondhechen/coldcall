import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

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

class Home extends Component {

    render() {
        return (
            <Container>
                <Logo>
                    COLD CALL
                </Logo>
            </Container>
        )
    }
}

export default withRouter(Home);