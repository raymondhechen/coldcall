import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../components/navbar';
import Footer from '../components/footer';
import SmallCardList from '../components/SmallCardList';

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    
    margin-top: 20vh;
    min-height: 70vh;
`;

const PeopleTitle = styled.div`
    padding: 0 0 0 5vw;
    font-family: Lato;
    font-weight: 700;
    font-size: 30px;
`;

const PeopleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 30vh;
`;

const ReservationsTitle = styled.div`
    padding: 0 0 0 5vw;
    font-family: Lato;
    font-weight: 700;
    font-size: 30px;
`;

const ReservationsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
`;


class Home extends Component {
    constructor() {
        super()
        this.state = {
            fiveUsers: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ 
            fiveUsers: [users[0], users[1], users[2], users[3], users[4]]
        }));
    }

    render() {
        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <PeopleTitle>
                        Featured People
                    </PeopleTitle>
                    <PeopleWrapper>
                        <SmallCardList users={this.state.fiveUsers}/>
                    </PeopleWrapper>

                    <ReservationsTitle>
                        Your Reserved Meetings
                    </ReservationsTitle>
                    <ReservationsWrapper>

                    </ReservationsWrapper>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default Home;