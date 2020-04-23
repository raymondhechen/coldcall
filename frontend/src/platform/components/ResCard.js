import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 40%;
    height: 25vh;
    padding-top: 1vh;
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

const Date = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 17.5px;
`;

const Topic = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
`;

const ResCard = ({ studentFirstName, studentLastName, studentEmail, teacherFirstName, teacherLastName, teacherEmail, date, startTime, endTime, topic, skill, location, place}) => {
    return (
        <Container>
            <Name><b>Student:</b> {studentFirstName} {studentLastName}</Name>
            <Name><b>Teacher:</b> {teacherFirstName} {teacherLastName}</Name>
            <Date><b>Date:</b> {date}</Date>
            <Date><b>Time:</b> {startTime}</Date>
            <Topic><b>{topic}</b> : {skill}</Topic>
            <Topic>{place}, {location}</Topic>
        </Container>
    );
}

export default ResCard;