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

const UserCardList = ({ users, token, history }) => {
    const cardArray = users.map((user, i) => {
        return (
            <UserCard 
                key={i} 
                token={token}
                history={history}
                uid={users[i].uid} 
                firstName={users[i].first_name} 
                lastName={users[i].last_name}
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