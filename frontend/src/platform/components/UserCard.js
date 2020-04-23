import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../assets/user.svg';
import Modal from './Modal';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    min-width: 225px;
    width: 17.5vw;
    height: 35vh;
    margin: 2.5vh 2vw 2.5vh 2vw;
    transition: background-color 0.2s ease-in-out;
    text-align: center;
    cursor: pointer;
    background-color: #56CCF2;

    :hover {
        background-color: #27bff2;
    }
`;

const Avatar = styled.img` 
    width: auto;
    height: 15vh;
    min-width: 225px;
    margin: 5vh 0 2.5vh 0;
`;

const Name = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 22.5px;
`;

const Email = styled.div`
    font-family: Lato;
    font-weight: 500;
    font-size: 15px;
`;

// const UserCard = ({ firstName, lastName, email }) => {
//     var show = false;
    // return (
    //     <Container>
    //         <Avatar src={UserAvatar} alt="user" />
    //         <Name>{firstName} {lastName}</Name>
    //         <Email>{email}</Email>
    //     </Container>
    // );
// }

class UserCard extends React.Component {
    state = { show: false };

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    render() {
        const { firstName } = this.props;
        const { lastName } = this.props;
        const { email } = this.props;
        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <h1>Schedule your meeting with { firstName } { lastName }!</h1>
                    <form>
                        <label for="name">Name:</label>
                        <input type="text" id="name" name="name"></input><br></br>
                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date"></input><br></br>
                        <label for="location">Location:</label>
                        <input type="text" id="location" name="location"></input><br></br>
                        <label for="placee">Place:</label>
                        <input type="text" id="place" name="place"></input><br></br>
                    </form>
                </Modal>
                <Container onClick={this.showModal}>
                    <Avatar src={UserAvatar} alt="user" />
                    <Name>{firstName} {lastName}</Name>
                    <Email>{email}</Email>
                </Container>        
            </div>
        );
    }
}

export default UserCard;