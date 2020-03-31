import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileIcon from '../../landing/assets/profile.svg';
import NavBar from '../components/navbar';

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
    font-weight: 900;
    font-size: 40px;
    line-height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 35%;
    cursor: default;

    color: #2F80ED;
`;

const ProfileButton = styled.img`
    background: #2F80ED;
    border-radius: 50%;
    margin: 3.5vh 7.5vw 0 0;

    display: flex;
    height: 50px;

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

const Footer = styled.div`
    height: 10vh;
    background-color: #4F4F4F;
    display: flex;
`

const FooterText = styled.div`
    color: #E0E0E0;
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
    padding: 5vh 0 0 2.5vw;
    width: 125vw;
`

class Profile extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Nav>
                    <Logo>
                        COLD CALL
                    </Logo>
                    <NavBar/>
                    <ProfileButton src={ProfileIcon} />
                </Nav>

                <BodyWrapper>
                    
                </BodyWrapper>

                <Footer>
                    <FooterText>
                        © Cold Call 2020
                    </FooterText>
                </Footer>
            </div>
        )
    }
}

export default Profile;