import React, { Component } from 'react';
import styled from 'styled-components';

import ProfileIcon from './assets/profile.svg';
import Arrow from './assets/arrow';
import LandingDesign from './assets/landingdesign.svg';
import Duke from './assets/duke.jpg';

const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15vh;
    z-index: 99;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
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
    cursor: default;

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
    font-family: lato;
    font-weight: 800;
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
    transition: background-color 0.2s ease;

    :active {
        background: #0086D1;
    }
`;

const Picture = styled.img`
    margin: 0 0 5vh 0;
    width: 100%;
    height: auto;
`;

const Body2 = styled.div`
    height: 90vh;
    padding-top: 15vh;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const BodyLeft = styled.div`
    width: 50%;
`;

const BodyRight = styled.div`
    width: 50%;
    margin: 7.5vh 5vw 0 0;
`;

const DukeImg = styled.img`
    width: 40vw;
    height: auto;
    padding: 0 0 0 10vw;
`;

const BodyText1 = styled.div`
    font-family: lato;
    font-weight: 800;
    font-size: 40px;
    line-height: 50px;
    position: relative;
    padding: 0 0 0 10vw; 
`

const BodyText2 = styled.div`
    font-family: proxima-nova;
    font-weight: 500;
    font-size: calc(1em + 1vw);
    line-height: 50px;
    position: relative;
    padding: 5vh 0 0 15vw; 
    line-height: 4.5vw;
`;

const BodyText3 = styled.div`
    font-family: lato;
    font-weight: 800;
    font-size: 30px;
    line-height: 50px;
    position: relative;
    padding: 5vh 0 0 0;
    text-align: center;
`;

const SubFooter1 = styled.div`
    background-color: #56CCF2;
    height: 5vh;
`;

const SubFooter2 = styled.div`
    background-color: #2D9CDB;
    height: 5vh;
`;

const SubFooter3 = styled.div`
    background-color: #2F80ED;
    height: 5vh;
`;

const Footer = styled.div`
    height: 20vh;
    background-color: #4F4F4F;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const FooterLeft = styled.div`
    color: #E0E0E0;
    font-family: Lato;
    font-weight: 500;
    font-size: 20px;
    padding: 10vh 0 0 5vw;
    width: 125vw;
`

const FooterRight = styled.div`
    color: #E0E0E0;
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
    padding: 5vh 5vw 0 0;
`


class Landing extends Component {
    joinClick = () => {
        this.props.history.push('/signup');
    }

    signinClick = () => {
        this.props.history.push('/signin');
    }

    render() {
        return (
            <div>
                <Nav>
                    <Logo>
                        COLD CALL
                    </Logo>
                    <ProfileButton src={ProfileIcon} onClick={e => this.signinClick(e)} />
                </Nav>

                <BodyWrapper>
                    <LeftWrapper>
                        <Picture src={LandingDesign} alt="design"/>
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

                <Body2>
                    <BodyLeft>
                        <BodyText1>
                            Here's how it works:
                        </BodyText1>
                        <BodyText2>
                            1.  Sign up! <br/>
                            2.  Create your profile <br/>
                            3.  Find other students <br/>
                            4.  Organize a meeting <br/>
                            5.  Get together!
                        </BodyText2>
                    </BodyLeft>
                    <BodyRight>
                        <DukeImg src={Duke} alt="duke"/>
                        <BodyText3>
                            We're at Duke!
                        </BodyText3>
                    </BodyRight>
                </Body2>
                
                <SubFooter1/>
                <SubFooter2/>
                <SubFooter3/>
                <Footer>
                    <FooterLeft>
                        © Cold Call 2020
                    </FooterLeft>
                    <FooterRight>
                        Designed and Built with ❤️ by <br/>
                        Raymond Chen, Shrey Gupta, Sachin Jaishankar, Jeffrey Luo, Luke Qin
                    </FooterRight>
                </Footer>
            </div>
        )
    }
}

export default Landing;