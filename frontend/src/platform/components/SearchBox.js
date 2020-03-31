import React from 'react';
import 'tachyons';

const SearchBox = ({ searchChange }) => {
    return (
        <div className='pa2'>
            <input className='tc pa3 ba b--green bg-lightest-blue' 
                type='search' 
                placeholder='Search People'
                onChange={searchChange}
            />
        </div>
    );
}

export default SearchBox;