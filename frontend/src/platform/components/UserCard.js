import React, { Component } from 'react';
import styled from 'styled-components';

import UserAvatar from '../assets/user.svg';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    min-width: 225px;
    width: 17.5vw;
    height: 35vh;
    margin: 2.5vh 2vw 2.5vh 2vw;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
    cursor: pointer;
    background-color: #56CCF2;

    :hover {
        background-color: #27bff2;
    }
`;

const Avatar = styled.img` 
    width: auto;
    height: 15vh;
    min-width: 225px;
    margin: 5vh 0 2.5vh 0;
`;

const Name = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 22.5px;
`;

const Email = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
`;

class UserCard extends Component {

    reserveUser() {
        this.props.history.push({
            pathname: '/reserve',
            state: {
                token: this.props.token,
                uid: this.props.uid,
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email
            }
        })
    }

    render() {
        return (
            <Container onClick={e => this.reserveUser(e)}>
                <Avatar src={UserAvatar} alt="user" />
                <Name>{this.props.firstName} {this.props.lastName}</Name>
                <Email>{this.props.email}</Email>
            </Container>
        );
    }
}

export default UserCard;