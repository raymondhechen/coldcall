import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    width: 40%;
    height: 30vh;
    padding-top: 1vh;
    margin: 2.5vh 2vw 2.5vh 2vw;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
    align-content: center;
    justify-content: center;
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

const DeleteButton = styled.input`
    width: 20%;
    max-width: 100px;
    height: 48px;
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

class ResCard extends Component {
    deleteRes = (event, rid) => {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'token': this.props.token,
                        'rid': rid
                    }
        };
        fetch('http://localhost:3000/api/reservations/delete', reqOptions)
        .then(
            this.props.history.push({
                pathname: '/reservations',
                state: {
                    token: this.props.token
                }
            })
        );
    };

    render() {
        return (
            <Container>
                <Name><b>Student:</b> {this.props.studentFirstName} {this.props.studentLastName}</Name>
                <Name><b>Teacher:</b> {this.props.teacherFirstName} {this.props.teacherLastName}</Name>
                <Date><b>Date:</b> {this.props.date}</Date>
                <Date><b>Time:</b> {this.props.startTime}</Date>
                <Topic><b>{this.props.topic}</b> : {this.props.skill}</Topic>
                <Topic>{this.props.place}, {this.props.location}</Topic>
                <DeleteButton type="button" value="DELETE" onClick={e => this.deleteRes(e, this.props.meetingID)}/>
            </Container>
        );
    };
}

export default ResCard;