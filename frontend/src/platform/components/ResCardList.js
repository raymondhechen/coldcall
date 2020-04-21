import React from 'react';
import styled from 'styled-components';
import ResCard from './ResCard';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;

    padding: 5vh 0 0 0;
`;

const ResCardList = ({ reservations }) => {
    const cardArray = reservations.map((reservation, i) => {
        return (
            <ResCard 
                key={i} 
                id={reservations[i].id} 
                name={reservations[i].name} 
                email={reservations[i].email}
                date={reservations[i].date}
                time={reservations[i].time}
                location={reservations[i].location}
            />
        );
    })

    return (
        <Container>
            {cardArray}
        </Container>
    );
}

export default ResCardList;