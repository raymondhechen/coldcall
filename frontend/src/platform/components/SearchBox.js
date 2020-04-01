import React from 'react';
import 'tachyons';
import './SearchBox.css';

const SearchBox = ({ searchChange }) => {
    return (
        <div className='pa2'>
            <input 
                type='search' 
                placeholder='Search People'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;