import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

import UserAvatar from '../assets/user.svg';

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: 10vh;
    min-height: 67.5vh;
`;

const LeftWrapper = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
`;

const Box = styled.div`
    background-color: gray;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
`;

const Avatar = styled.img` 
    width: auto;
    height: 15vh;
    min-width: 225px;
    margin: 7.5vh 0 0 0;
`;

const Title = styled.div`
    font-family: proxima-nova;
    font-weight: 700;
    font-size: 30px;
`;

const SubTitle = styled.div`
    font-family: proxima-nova;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 10px;
`;

const RightWrapper = styled.div`
    width: 50%
`;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "", 
            skills: [],
            token: ""
        };
    }

    componentDidMount() {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'token': this.props.location.state.token
                    },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        };
        fetch('http://localhost:5000/api/auth/user', reqOptions)
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
            const { json: {data: [emailAdd, first, last, skillSet]}} = this.state;
            this.setState({firstName: first});
            this.setState({lastName: last});
            this.setState({email: emailAdd});
            this.setState({skills: skillSet})
        });
    }

    render() {
        var skillList = this.state.skills.map(function(name) {
            return <div>{name}</div>;
        })

        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <LeftWrapper>
                        <Box>
                            <Avatar src={ UserAvatar } alt="user" />
                        </Box>
                    </LeftWrapper>
                    <RightWrapper>
                        <Title>
                            Name
                        </Title>
                        <SubTitle>
                            {this.state.firstName} {this.state.lastName}
                        </SubTitle>
                        <Title>
                            Email
                        </Title>
                        <SubTitle>
                            {this.state.email}
                        </SubTitle>
                        <Title>
                            Skills
                        </Title>
                        <SubTitle>
                            {skillList}
                        </SubTitle>

                    </RightWrapper>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default Profile;