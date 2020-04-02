import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 10vh;
    height: 12.5vh;
    background-color: #4F4F4F;
`

const FooterText = styled.div`
    color: #E0E0E0;
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
    padding: 5vh 0 0 2.5vw;
`

class Footer extends Component {
    render() {
        return (
            <Container>
                    <FooterText>
                        © Cold Call 2020
                    </FooterText>
            </Container>
        );
    }
}

export default withRouter(Footer);

