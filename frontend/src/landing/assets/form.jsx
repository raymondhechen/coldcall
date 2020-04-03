import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

const EmailTextBox = styled.input`
    width: 50%;
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

const EmailButton = styled.input`
    width: 15%;
    height: 48px;
    padding-bottom: 1px;
    border-radius: 5px;
    border: 0;
    outline: none;
    background: #19A4F2;
    font-family: proxima-nova;
    font-weight: 700;

    :active {
        background: #0086D1;
    }
`;

const ErrorMsg = styled.div`
    color: red;
`;

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            valid: true
        };
    }

    handleChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    }

    joinClick = () => {
        if (this.validateEmail(this.state.email)) {
            this.setState({
                valid: true
            });
            this.props.history.push('/join');
        }
        else {
            this.setState({
                valid: false
            });
        }
    }
    
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    render() {
        return (
            <div>
                <EmailTextBox type="form" value={this.state.email} onChange={e => this.handleChange(e)} onSubmit={e => this.joinClick(e)}/>
                <EmailButton type="button" value="JOIN" onClick={e => this.joinClick(e)}/>
                {!this.state.valid ? 
                    <ErrorMsg>Invalid Email Address</ErrorMsg> : 
                    null
                }
            </div>
        )
    }
}

export default withRouter(Form);