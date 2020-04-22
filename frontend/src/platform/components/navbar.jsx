import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
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
    padding: 1vh 0 0 5vw;

    font-family: Lato;
    font-weight: 900;
    font-size: calc(1.5em + 1vw);
    display: flex;
    align-items: center;
    text-align: center;
    width: 35%;
    color: #2F80ED;
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
    cursor: pointer;
    transition: color 0.15s ease-in-out;
    color: #2F80ED;

    :hover {
        color: #024fb8;
    }
`;


class NavBar extends Component {
    // goHome() {
    //     this.props.history.push({
    //         pathname: '/home',
    //         state: {
    //             token: this.props.location.state.token
    //         }
    //     });
    // }

    goPeople() {
        this.props.history.push({
            pathname: '/people',
            state: {
                token: this.props.location.state.token
            }
        });
    }

    goReservations() {
        this.props.history.push({
            pathname: '/reservations',
            state: {
                token: this.props.location.state.token
            }
        });
    }

    goProfile() {
        this.props.history.push({
            pathname: '/profile',
            state: {
                token: this.props.location.state.token
            }
        });
    }

    render() {
        return (
            <Nav>
                <Logo>
                    COLD CALL
                </Logo>
                <Ul>
                    <Li onClick={e => this.goReservations(e)}>RESERVATIONS</Li>
                    <Li onClick={e => this.goPeople(e)}>PEOPLE</Li>
                </Ul>
                <ProfileButton src={ProfileIcon} onClick={e => this.goProfile(e)}/>
            </Nav>
        );
    }
}

export default withRouter(NavBar);

