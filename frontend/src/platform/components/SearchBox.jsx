import React from 'react';
import styled from 'styled-components';

const Textbox = styled.input`
    width: 35%;
    max-width: 300px;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`;

const SearchBox = ({ defaultText, searchChange }) => {
    return (
        <Textbox
            type='search' 
            placeholder={defaultText}
            onChange={searchChange}
        />
    );
}

export default SearchBox;