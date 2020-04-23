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
                studentName={reservations[i].student_id} 
                teacherName={reservations[i].teacher_id}
                date={reservations[i].date}
                startTime={reservations[i].start_time}
                endTime={reservations[i].end_time}
                topic={reservations[i].skillTopic}
                skill={reservations[i].skillName}
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