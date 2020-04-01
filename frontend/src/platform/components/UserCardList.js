import React from 'react';
import UserCard from './UserCard';

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
        <div>
            {cardArray}
        </div>
    );
}

export default UserCardList;