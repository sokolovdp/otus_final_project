import React from 'react';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Jumbotron from "reactstrap/es/Jumbotron";
import {Redirect} from 'react-router-dom'

export default class RegistrationForm extends React.Component {
        constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
            isRegistered: false,
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm(event) {
        event.preventDefault();
        // let jsonData = JSON.stringify(this.state);

        // fetch('/api/v1/get_auth_token', {method: 'POST', body: jsonData})
        //     .then(response => checkResponseStatus(response))
        //     .then(result => {
        //         let token = result.token;
        //         let username = this.state.username
        //         sessionStorage.setItem('username', username);
        //         sessionStorage.setItem('token', token);
        //     })
        //     .catch(error => failGetFunction(error));

        console.log(this.state);

        this.setState({isRegistered: true});

    }

    render() {
        if (this.state.isRegistered)
            return <Redirect to="/login"/>;
        return (
            <Jumbotron>
            <Form onSubmit={this.submitForm}>
                <Row form>
                    <Col  md={3}>
                        <FormGroup>
                            <Label for="formUsername">Username</Label>
                            <Input type="text" name="username" id="formUsername" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col  md={3}>
                        <FormGroup>
                            <Label for="formPassword">Password</Label>
                            <Input type="password" name="password" id="formPassword" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formEmail">Email</Label>
                            <Input type="email" name="email" id="formEmail" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formFirstName">First Name</Label>
                            <Input type="text" name="name" id="fromFirstName" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formSurname">Surname</Label>
                            <Input type="text" name="surname" id="formSurname" onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Sign up</Button>
            </Form>
            </Jumbotron>
        );
    }
}