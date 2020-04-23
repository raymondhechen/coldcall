import React from 'react';
import styled from 'styled-components';
import ResCard from './ResCard';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    width: 100%;

    padding: 5vh 0 0 0;
`;

const ResCardList = ({ reservations, token, history }) => {
    const cardArray = reservations.map((reservation, i) => {
        return (
            <ResCard 
                key={i} 
                token={token}
                history={history}
                meetingID={reservations[i].rid}
                studentFirstName={reservations[i].firstl} 
                studentLastName={reservations[i].lastl} 
                studentEmail={reservations[i].emaill}
                teacherFirstName={reservations[i].firstt}
                teacherLastName={reservations[i].lastt}
                teacherEmail={reservations[i].emailt}
                date={reservations[i].date}
                startTime={reservations[i].start_time}
                endTime={reservations[i].end_time}
                topic={reservations[i].topic}
                skill={reservations[i].skill}
                location={reservations[i].loc}
                place={reservations[i].place}
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