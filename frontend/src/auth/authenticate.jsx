import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import XIcon from './x.svg';

const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15vh;
    z-index: 99;

    display: flex;
    flex-direction: row;
    justify-content: space-between
`;

const Logo = styled.div`
    padding: 0 0 0 5vw;

    font-family: Lato;
    font-style: normal;
    font-weight: 900;
    font-size: 50px;
    line-height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 50%;

    color: #2F80ED;
`;

const XButton = styled.img`
    margin: 5vh 7.5vw 0 0;
    height: 35px;

    :hover {
        cursor: pointer;
    }
`;

const Title = styled.div`
    margin-top: 7.5vh;
    margin-bottom: 2.5vh;

    font-family: proxima-nova;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    width: 100%;

    color: black;
`;

const Subtitle = styled.div`
    font-family: proxima-nova;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    width: 100%;

    color: black;
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: 10vh;
    height: 85vh;
`;

const TextBox = styled.input`
    width: 35%;
    max-width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`;

const PassTextBox = styled.input`
    width: 35%;
    max-width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
    -webkit-text-security: disc;
`;

const Button = styled.input`
    margin-top: 2.5vh;

    width: 15%;
    max-width: 100px;
    height: 48px;
    padding-bottom: 1px;
    border-radius: 5px;
    border: 0;
    outline: none;
    background: #19A4F2;
    font-family: proxima-nova;
    font-weight: 700;

    :active {
        background: #0086D1;
    }
`;

class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            new: true
        };
    }

    backClick = () => {
        this.props.history.push('/');
    }

    render() {
        if (this.state.new === true) {
            return (
                <div>
                    <Nav>
                        <Logo>
                            COLD CALL
                        </Logo>
                        <XButton src={XIcon} onClick={e => this.backClick(e)}/>
                    </Nav>

                    <BodyWrapper>
                        <Title>
                        SIGN UP
                        </Title>
                        <Subtitle>
                        Email (.edu)
                        </Subtitle>
                        <TextBox/>
                        <Subtitle>
                        First Name
                        </Subtitle>
                        <TextBox/>
                        <Subtitle>
                        Last Name
                        </Subtitle>
                        <TextBox/>
                        <Subtitle>
                        Password
                        </Subtitle>
                        <PassTextBox/>
                        <Button type="button" value="JOIN" />
                    </BodyWrapper>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Nav>
                        <Logo>
                            COLD CALL
                        </Logo>
                        <XButton src={XIcon} onClick={e => this.backClick(e)}/>
                    </Nav>

                    <BodyWrapper>
                        <Title>
                        SIGN IN
                        </Title>
                        <Subtitle>
                        Email
                        </Subtitle>
                        <TextBox/>
                        <Subtitle>
                        Password
                        </Subtitle>
                        <PassTextBox/>
                        <Button type="button" value="ENTER" />
                    </BodyWrapper>
                </div>
            );
        }
    }
}

export default withRouter(Authenticate);