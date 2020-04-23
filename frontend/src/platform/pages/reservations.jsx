import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import NavBar from '../components/navbar';
import ResCardList from '../components/ResCardList';
import Footer from '../components/footer';

const BodyWrapper = styled.div`    
    padding-top: 15vh;
    align-items: center;
    text-align: center;
    min-height: 72.5vh;
`;

const LearningButton = styled.input`
    padding-top: 0.25vh;
    width: 10%;
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
    width: 15%;
    height: 6.5vh;
    max-width: 300px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`

class Reservations extends Component {
    constructor() {
        super()
        this.state = {
            reservations: [],
            searchfield: '',
            searchType: 0
        }
    }

    componentDidMount() {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
                        'token': this.props.location.state.token
                    }
        };
        fetch('http://localhost:3000/api/reservations', reqOptions)
        .then((response) => {
            return response;
        })
        .then(response => 
            response.json()
            .then(json => ({
                status: response.status,
                json
            }))
        )
        .then(({ json }) => {
            console.log(json);
            this.setState({json});
            const { json: {data: resList}} = this.state;
            this.setState({reservations: resList});
        });
    }

    changeTopic = (event) => {
        // all
        if (event.target.value === "All") {

        }
        // learnings
        else if (event.target.value === "Learnings") {

        }
        // teachings
        else {

        }
    }

    render() {
        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                <TopicSelect id="Topics" onChange={e => this.changeTopic(e)}>
                            <option value="All">All</option>
                            <option value="Learnings">Learnings</option>
                            <option value="Teachings">Teachings</option>
                        </TopicSelect>
                    <ResCardList reservations={this.state.reservations}/>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(Reservations);