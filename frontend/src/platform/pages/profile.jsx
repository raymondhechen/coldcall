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
    componentWillMount() {

    }

    render() {
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
                            Raymond Chen
                        </SubTitle>
                        <Title>
                            Email
                        </Title>
                        <SubTitle>
                            rc284@duke.edu
                        </SubTitle>
                        <Title>
                            Interests
                        </Title>
                        <SubTitle>
                            Computer Science, Data Science
                        </SubTitle>

                    </RightWrapper>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default Profile;