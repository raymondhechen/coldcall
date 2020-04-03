import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import styled from 'styled-components';
import ProfileIcon from '../../landing/assets/profile.svg';

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
    background-color: #e8e8e8;
`;

const Logo = styled.div`
    padding: 0 0 0 5vw;

    font-family: Lato;
    font-weight: 900;
    font-size: calc(1.5em + 1vw);
    line-height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 35%;
    cursor: pointer;
    transition: color 0.15s ease-in-out;
    color: #2F80ED;

    :hover {
        color: #024fb8;
    }
`;

const ProfileButton = styled.img`
    background: #2F80ED;
    border-radius: 50%;
    margin: 4.5vh 7.5vw 0 0;
    transition: background-color 0.15s ease-in-out;
    display: flex;
    height: 50px;

    :hover {
        cursor: pointer;
        background-color: #024fb8;
    }
`;

const Ul = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 5vh 0 0 10vw;
    overflow: hidden;
`;

const Li = styled.li`
    float: right;
    padding: 0 2.5vw 0 2.5vw;
    font-family: Lato;
    font-weight: 800;
    font-size: calc(1em + 1vw);
    transition: color 0.2s;
`;


class NavBar extends Component {
    goHome() {
        this.props.history.push('/home');
    }

    goProfile() {
        this.props.history.push('/profile');
    }

    render() {
        return (
            <Nav>
                <Logo onClick={e => this.goHome(e)}>
                    COLD CALL
                </Logo>
                <Ul>
                    <Link to="/reservations">
                        <Li>RESERVATIONS</Li>
                    </Link>
                    <Link to="/people">
                        <Li>PEOPLE</Li>
                    </Link>
                </Ul>
                <ProfileButton src={ProfileIcon} onClick={e => this.goProfile(e)}/>
            </Nav>
        );
    }
}

export default withRouter(NavBar);

