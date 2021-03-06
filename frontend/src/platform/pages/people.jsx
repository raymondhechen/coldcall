import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import NavBar from '../components/navbar';
import UserCardList from '../components/UserCardList';
import Footer from '../components/footer';

const BodyWrapper = styled.div`    
    margin-top: 5vh;
    align-items: center;
    text-align: center;
    min-height: 72.5vh;
`;

const SearchWrapper = styled.div`
    padding-top: 15vh;
    display: flex; 
    flex-direction: row; 
    justify-content: center;
`;

const SearchBox = styled.input`
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

const Button = styled.input`
    margin-top: 1.1vh;
    width: 15%;
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
    max-width: 150px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`

class People extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            field: '',
            topic: "STEM"
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
            this.setState({
                token: this.props.location.state.token
            })

            fetch('http://localhost:3000/api/users')
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
                const { json: {data: usersList}} = this.state;
                this.setState({users: usersList});
            });
        }
    }

    handleSubmit() {
        const reqOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch(`http://localhost:3000/api/users/topicskill?topic=${this.state.topic}&skill=${this.state.field}`, reqOptions)
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
            const { json: {data: userList}} = this.state;
            this.setState({users: userList});
        })
        .catch((error) => {
            console.log(error)
        });
    }

    onSearchChange = (event) => {
        this.setState({ field: event.target.value });
    }

    onTopicChange = (event) => {
        this.setState({ topic: event.target.value });
    }

    render() {
        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <SearchWrapper>
                        <TopicSelect id="Topics" onChange={e => this.onTopicChange(e)}>
                            <option value="STEM">STEM</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Athletics">Athletics</option>
                        </TopicSelect>
                        <SearchBox placeholder={"Search Skills"} onChange={(e) => this.onSearchChange(e)} />
                        <Button type="button" value="ENTER" onClick={e => this.handleSubmit(e)} />
                    </SearchWrapper>
                    <UserCardList users={this.state.users} token={this.state.token} history={this.props.history} />
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(People);