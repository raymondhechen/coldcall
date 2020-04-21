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

class Reservations extends Component {
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

    render() {
        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <ResCardList reservations={this.state.users}/>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(Reservations);