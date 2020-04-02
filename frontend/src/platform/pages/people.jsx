import React, { Component } from 'react';
import styled from 'styled-components';
import ProfileIcon from '../../landing/assets/profile.svg';
import NavBar from '../components/navbar';
import UserCardList from '../components/UserCardList.js';

const Nav = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 15vh;
    z-index: 99;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: white;
`;

const Logo = styled.div`
    padding: 0 0 0 5vw;

    font-family: Lato;
    font-weight: 900;
    font-size: 40px;
    line-height: 60px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 35%;
    cursor: default;

    color: #2F80ED;
`;

const ProfileButton = styled.img`
    background: #2F80ED;
    border-radius: 50%;
    margin: 3.5vh 7.5vw 0 0;

    display: flex;
    height: 50px;

    :hover {
        cursor: pointer;
    }
`;

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

const Footer = styled.div`
    margin-top: 10vh;
    height: 12.5vh;
    background-color: #4F4F4F;
`

const FooterText = styled.div`
    color: #E0E0E0;
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
    padding: 5vh 0 0 2.5vw;
`

class People extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            searchfield: '',
            emailSearch: false
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ 
            users: users
        }));
    }

    onSearchChange = (event, emailBool) => {
        this.setState({ searchfield: event.target.value });
        if (emailBool === true) {
            this.setState({
                emailSearch: true
            })
        }
        else {
            this.setState({
                emailSearch: false
            })
        }
    }

    render() {
        const { users, searchfield, emailSearch } = this.state;
        if (emailSearch === true) {
            var filteredResults = users.filter(user => {
                    return user.email.toLowerCase().includes(searchfield.toLowerCase());
                })
        }
        else {
            var filteredResults = this.state.users.filter(user => {
                return user.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
            })
        }

        return (
            <div>
                <Nav>
                    <Logo>
                        COLD CALL
                    </Logo>
                    <NavBar/>
                    <ProfileButton src={ProfileIcon} />
                </Nav>

                <BodyWrapper>
                    <SearchWrapper>
                        <SearchBox placeholder={"Search Names"} onChange={(e) => this.onSearchChange(e, false)} />
                        <SearchBox placeholder={"Search Emails"} onChange={(e) => this.onSearchChange(e, true)} />
                    </SearchWrapper>
                    <UserCardList users={filteredResults}/>
                </BodyWrapper>

                <Footer>
                    <FooterText>
                        © Cold Call 2020
                    </FooterText>
                </Footer>
            </div>
        )
    }
}

export default People;