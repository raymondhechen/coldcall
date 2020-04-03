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
    justify-content: space-evenly;
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

class People extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            searchfield: '',
            searchType: 0
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ 
            users: users
        }));
    }

    onSearchChange = (event, searchValue) => {
        this.setState({ searchfield: event.target.value });
        if (searchValue === 0) {
            this.setState({
                searchType: 0
            })
        }
        else {
            this.setState({
                searchType: 1
            })
        }
    }

    render() {
        const { users, searchfield, searchType } = this.state;
        if (searchType === 0) {
            var filteredResults = users.filter(user => {
                    return user.name.toLowerCase().includes(searchfield.toLowerCase());
                })
        }
        else if (searchType === 1) {
            filteredResults = this.state.users.filter(user => {
                return user.email.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })
        }
        else if (searchType === 2) {
            filteredResults = this.state.users.filter(user => {
                return user.email.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })
        }
        else {
            filteredResults = this.state.users.filter(user => {
                return user.email.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })
        }

        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <SearchWrapper>
                        <SearchBox placeholder={"Search Names"} onChange={(e) => this.onSearchChange(e, 0)} />
                        <SearchBox placeholder={"Search Emails"} onChange={(e) => this.onSearchChange(e, 1)} />
                    </SearchWrapper>
                    <UserCardList users={filteredResults}/>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(People);