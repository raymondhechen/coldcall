import React from 'react';
import styled from 'styled-components';
import SmallCard from './SmallUserCard';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

const SmallCardList = ({ users }) => {
    const cardArray = users.map((user, i) => {
        return (
            <SmallCard 
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

export default SmallCardList;