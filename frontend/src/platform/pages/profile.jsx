import React, { Component } from 'react';
import styled from 'styled-components';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: 10vh;
    min-height: 67.5vh;
`;

class Profile extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default Profile;