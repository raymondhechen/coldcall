import React, { Component } from 'react';
import styled from 'styled-components';

import ProfileIcon from './profile.svg';
import Arrow from './arrow';

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

const ProfileButton = styled.img`
    background: #2F80ED;
    border-radius: 50%;
    margin: 4vh 7.5vw 0 0;

    display: flex;
    height: 60px;

    :hover {
        cursor: pointer;
    }
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: 10vh;
    height: 85vh;
`;

const LeftWrapper = styled.div`
    width: 50%;
`;

const RightWrapper = styled.div`
    width: 50%;
    text-align: left;
    display: flex;
    flex-direction: column;
`;

const RightText = styled.div`
    font-family: proxima-nova;
    font-weight: bold;
    font-size: 35px;
    line-height: 50px;
    position: relative;
    bottom: 10vh;
    width: 75%;
`;

const JoinButton = styled.input`
    width: 30%;
    height: 50px;
    margin-top: -5vh;
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

const Picture = styled.div`
    width: 30vw;
    height: 40vh;
    margin: 0 0 15vh 10vw;
    background: #DDDCDC;
`;


const Body2 = styled.div`
    height: 100vh;
`;


class Landing extends Component {
    joinClick = () => {
        this.props.history.push('/join');
    }

    render() {
        return (
            <div>
                <Nav>
                    <Logo>
                        COLD CALL
                    </Logo>
                    <ProfileButton src={ProfileIcon}/>
                </Nav>

                <BodyWrapper>
                    <LeftWrapper>
                        <Picture/>
                    </LeftWrapper>

                    <RightWrapper>
                        <RightText>
                            Want to meet the right people? 
                            Let us connect you with the people you’re looking for.
                        </RightText>
                        <JoinButton type="button" value="JOIN" onClick={e => this.joinClick(e)} />
                    </RightWrapper>
                </BodyWrapper>

                <Arrow/>

                <Body2/>
            
            </div>
        )
    }
}

export default Landing;