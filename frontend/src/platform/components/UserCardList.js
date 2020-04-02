import React from 'react';
import styled from 'styled-components';
import UserCard from './UserCard';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    padding: 5vh 0 0 0;
`;

const UserCardList = ({ users }) => {
    const cardArray = users.map((user, i) => {
        return (
            <UserCard 
                key={i} 
                id={users[i].id} 
                name={users[i].name} 
                email={users[i].email}
            />
        );
    })

    return (
        <Container>
            {cardArray}
        </Container>
    );
}

export default UserCardList;