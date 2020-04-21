import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    min-width: 225px;
    width: 17.5vw;
    height: 25vh;
    margin: 2.5vh 2vw 2.5vh 2vw;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
    cursor: pointer;
    background-color: #56CCF2;

    :hover {
        background-color: #27bff2;
    }
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

const Date = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
`;

const Time = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
`;

const ResCard = ({ name, email, date, time }) => {
    return (
        <Container>
            <Name>{name}</Name>
            <Email>{email}</Email>
            <Date>{date}</Date>
            <Time>{time}</Time>
        </Container>
    );
}

export default ResCard;