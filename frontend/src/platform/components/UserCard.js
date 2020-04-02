import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    min-width: 225px;
    width: 17.5vw;
    height: 35vh;
    margin: 2.5vh 2vw 2.5vh 2vw;
    transition: box-shadow 0.3s ease-in-out;
    text-align: center;
    cursor: pointer;
    background-color: #56CCF2;
`;

const Avatar = styled.img` 
    width: auto;
    height: 20vh;
    min-width: 225px;
    margin: 0 0 2.5vh 0;
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

const UserCard = ({ name, email, uid }) => {
    return (
        <Container>
            <Avatar src={`https://robohash.org/${uid}?50x50`} alt="user" />
            <Name>{name}</Name>
            <Email>{email}</Email>
        </Container>
    );
}

export default UserCard;