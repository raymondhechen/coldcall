import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    min-width: 150px;
    width: 10vw;
    height: 20vh;
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
    height: 12.5vh;
    margin: 0 0 2.5vh 0;
`;

const Name = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 17.5px;
`;

const SmallCard = ({ name, email, id }) => {
    return (
        <Container>
            <Avatar src={`https://robohash.org/${id}?50x50`} alt="user" />
            <Name>{name}</Name>
        </Container>
    );
}

export default SmallCard;