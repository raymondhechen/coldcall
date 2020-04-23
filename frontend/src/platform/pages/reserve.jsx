import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import XIcon from '../../auth/x.svg';

const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15vh;
    z-index: 99;

    display: flex;
    flex-direction: row;
    justify-content: space-between
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

    color: #2F80ED;
`;

const XButton = styled.img`
    margin: 5vh 7.5vw 0 0;
    height: 35px;

    :hover {
        cursor: pointer;
    }
`;

const Title = styled.div`
    margin-top: 2.5vh;

    font-family: proxima-nova;
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 60px;
    text-align: center;
    width: 100%;

    color: black;
`;

const Subtitle = styled.div`
    font-family: proxima-nova;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    width: 100%;

    color: black;
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: 10vh;
    height: 85vh;
`;

const TextBox = styled.input`
    width: 35%;
    max-width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`;

const DateBox = styled.input`
    width: 27.5%;
    max-width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
    text-align: center;
`;


const Button = styled.input`
    margin-top: 2.5vh;

    width: 27.5%;
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

const TopicSelect = styled.select` 
    width: 25%;
    height: 6.5vh;
    max-width: 150px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 600;
    background: #E0E0E0;
`

class Reserve extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            time: "",
            location: "West Union",
            place: "First Floor",
            token: ""
        };
    }

    // Back click function
    backClick() {
        this.props.history.push({
            pathname: '/people',
            state: {
                token: this.props.location.state.token
            }
        });
    }

    // handling textbox changes --> updating state
    dateChange = (e) => {
        this.setState({
            date: e.target.value,
        });
    }

    timeChange = (e) => {
        this.setState({
            time: e.target.value,
        });
    }

    locChange = (e) => {
        this.setState({
            location: e.target.value,
        });
    }

    placeChange = (e) => {
        this.setState({
            place: e.target.value,
        });
    }

    submitRequest() {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, first_name: this.state.firstName, last_name: this.state.lastName, password: this.state.password })
        };
        fetch('http://localhost:3000/api/auth/signup', reqOptions)
        .then((response) => {
            return response;
        })
        .then(response =>
            response.json()
            .then(json => ({
                status: response.status,
                json
            })
        ))
        .then(({ status, json }) => {
            this.setState({json});
            const { json: {data: {token: tokenID}}} = this.state;
            this.setState({token: tokenID});
            if (status === 201) {
                this.props.history.push({
                    pathname: '/reservations',
                    state: {
                        token: tokenID
                    }
                });
            }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    handleEnterKey = (e) => {
        if (e.key === 'Enter') {
            this.validateEmail();
        }
    }

    render() {
        return (
            <div>
                <Nav>
                    <Logo>
                        COLD CALL
                    </Logo>
                    <XButton src={XIcon} onClick={e => this.backClick(e)}/>
                </Nav>

                <BodyWrapper>
                    <Title>Reserve a Learning</Title>
                    <Subtitle><b>Name:</b> {this.props.location.state.firstName} {this.props.location.state.lastName}</Subtitle>
                    <Subtitle><b>Email:</b> {this.props.location.state.email}</Subtitle>
                    <br/>
                    <Subtitle>
                    <b>Date</b>
                    </Subtitle>
                    <DateBox type="date" value={this.state.lastName} onKeyPress={this.handleEnterKey} onChange={e => this.dateChange(e)}/>
                    <Subtitle>
                    <b>Time</b> (1 hour duration)
                    </Subtitle>
                    <DateBox type="time" value={this.state.lastName} onKeyPress={this.handleEnterKey} onChange={e => this.timeChange(e)}/>
                    <Subtitle>
                    <b>Location     </b>
                        <TopicSelect id="locations" onChange={e => this.locChange(e)}>
                            <option value="West Union">West Union</option>
                            <option value="Perkins">Perkins</option>
                            <option value="Bostock">Bostock</option>
                            <option value="Bryan Center">Bryan Center</option>
                        </TopicSelect>
                        <br/>
                    <b>Place        </b>
                        <TopicSelect id="locations" onChange={e => this.locChange(e)}>
                            <option value="First Floor">First Floor</option>
                            <option value="Second Floor">Second Floor</option>
                            <option value="Third Floor">Third Floor</option>
                            <option value="Basement">Basement</option>
                        </TopicSelect>
                    </Subtitle>
                    <Button type="button" value="RESERVE" onClick={e => this.submitRequest(e)} />
                </BodyWrapper>
            </div>
        );
    }
}

export default withRouter(Reserve);