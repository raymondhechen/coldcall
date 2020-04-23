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
    min-height: 77.5vh;
`;

const TopicSelect = styled.select` 
    width: 12.5%;
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
        if (this.props.location.state === undefined) {
            this.props.history.push({
                pathname: '/signin',
            })
        }
        else {
            console.log(this.props.location.state.token);
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
                this.setState({json});
                const { json: {data: resList}} = this.state;
                this.setState({reservations: resList});
            });
        }
    }

    changeTopic = (event) => {
        // all
        if (event.target.value === "All") {
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
        // learnings
        else if (event.target.value === "Learnings") {
            const reqOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                            'token': this.props.location.state.token
                        }
            };
            fetch('http://localhost:3000/api/learnings', reqOptions)
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
        // teachings
        else {
            const reqOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json',
                            'token': this.props.location.state.token
                        }
            };
            fetch('http://localhost:3000/api/teachings', reqOptions)
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
                    <ResCardList reservations={this.state.reservations} token={this.props.location.state.token} history={this.props.history}/>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(Reservations);