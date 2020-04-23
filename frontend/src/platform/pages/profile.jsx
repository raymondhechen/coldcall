import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import NavBar from '../components/navbar';
import Footer from '../components/footer';

import UserAvatar from '../assets/user.svg';

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    margin-top: 10vh;
    min-height: 67.5vh;
`;

const LeftWrapper = styled.div`
    width: 35%;
    display: flex;
    justify-content: center;
    margin-right: 10vw;
    padding-left: 10vw;
`;

const Box = styled.div`
    background-color: gray;
    width: 250px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
`;

const Avatar = styled.img` 
    width: auto;
    height: 15vh;
    min-width: 225px;
    margin: 7.5vh 0 0 0;
`;

const Title = styled.div`
    font-family: proxima-nova;
    font-weight: 700;
    font-size: 30px;
`;

const SubTitle = styled.div`
    font-family: proxima-nova;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 10px;
`;

const RightWrapper = styled.div`
    width: 25%
`;

const ThirdWrapper = styled.div` 
    width: 40%
`;

const AddSkillBox = styled.input`
    width: 40%;
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

const AddButton = styled.input`
    padding-top: 0.25vh;
    width: 15%;
    max-width: 100px;
    height: 48px;
    border-radius: 5px;
    border: 0;
    outline: none;
    background: #19A4F2;
    font-family: proxima-nova;
    font-weight: 700;
    transition: background-color 0.2s ease;

    :active {
        background: #0086D1;
    }
`;

const TopicSelect = styled.select` 
    width: 20%;
    height: 6.5vh;
    max-width: 300px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    border-radius: 5px;
    font-family: proxima-nova;
    font-weight: 700;
    background: #E0E0E0;
`

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            firstName: "",
            lastName: "", 
            skills: [],
            token: "",
            addField: "",
            addTopic: "STEM",
            delField: "",
            delTopic: "STEM"
        };
    }

    componentDidMount() {
        if (this.props.location.state === undefined) {
            this.props.history.push({
                pathname: '/signin',
            })
        }
        else {
            console.log(this.props.location.state.token);

            const reqOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                            'token': this.props.location.state.token
                        },
                body: JSON.stringify({ email: this.state.email, password: this.state.password })
            };
            fetch('http://localhost:3000/api/auth/user', reqOptions)
            .then((response) => {
                return response;
            })
            .then(response => 
                response.json()
                .then(json => ({
                    status: response.status,
                    json
                }))
            )
            .then(({ json }) => {
                this.setState({json});
                const { json: {data: [uid, emailAdd, first, last, skillSet]}} = this.state;
                this.setState({firstName: first});
                this.setState({lastName: last});
                this.setState({email: emailAdd});
                this.setState({skills: skillSet})
            });
        }
    }

    async addSkill() {
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'token': this.props.location.state.token 
                    },
            body: JSON.stringify({ topic: this.state.addTopic, skill: this.state.addField})
        };
        fetch(`http://localhost:3000/api/auth/addskill`, reqOptions)
        .then(
            await this.wait(100)
        )
        .then(
            this.props.history.push({
                pathname: '/profile',
                state: {
                    token: this.props.location.state.token
                }
            })
        );
    }

    async deleteSkill() {
        console.log(this.state.delField);
        console.log(this.state.delTopic);
        const reqOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                        'token': this.props.location.state.token 
                    },
            body: JSON.stringify({ topic: this.state.delTopic, skill: this.state.delField})
        };
        fetch(`http://localhost:3000/api/auth/deleteskill`, reqOptions)
        .then(
            await this.wait(100)
        )
        .then(
            this.props.history.push({
                pathname: '/profile',
                state: {
                    token: this.props.location.state.token
                }
            })
        );
    }

    changeTopic = (event) => {
        this.setState({ addTopic: event.target.value });
    }

    changeSearch = (event) => {
        this.setState({ addField: event.target.value });
    }

    changeDelTopic = (event) => {
        this.setState({ delTopic: event.target.value });
    }

    changeDelSearch = (event) => {
        this.setState({ delField: event.target.value });
    }

    wait(timeout) {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    render() {
        var skillList = this.state.skills.map(function(name) {
            return <div>{name}</div>;
        })

        return (
            <div>
                <NavBar/>

                <BodyWrapper>
                    <LeftWrapper>
                        <Box>
                            <Avatar src={ UserAvatar } alt="user" />
                        </Box>
                    </LeftWrapper>
                    <RightWrapper>
                        <Title>
                            Name
                        </Title>
                        <SubTitle>
                            {this.state.firstName} {this.state.lastName}
                        </SubTitle>
                        <Title>
                            Email
                        </Title>
                        <SubTitle>
                            {this.state.email}
                        </SubTitle>
                        <Title>
                            Skills
                        </Title>
                        <SubTitle>
                            {skillList}
                        </SubTitle>
                    </RightWrapper>
                    <ThirdWrapper>
                        <TopicSelect id="Topics" onChange={e => this.changeTopic(e)}>
                            <option value="STEM">STEM</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Athletics">Athletics</option>
                        </TopicSelect>
                        <AddSkillBox placeholder={"Add Skill"} onChange={e => this.changeSearch(e)}/>
                        <AddButton type="button" value="ADD" onClick={e => this.addSkill(e)} />
                        <br/>
                        <TopicSelect id="Topics" onChange={e => this.changeDelTopic(e)}>
                            <option value="STEM">STEM</option>
                            <option value="Humanities">Humanities</option>
                            <option value="Athletics">Athletics</option>
                        </TopicSelect>
                        <AddSkillBox placeholder={"Delete Skill"} onChange={e => this.changeDelSearch(e)}/>
                        <AddButton type="button" value="DELETE" onClick={e => this.deleteSkill(e)} />
                    </ThirdWrapper>
                </BodyWrapper>

                <Footer/>
            </div>
        )
    }
}

export default withRouter(Profile);