import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Jumbotron from "reactstrap/es/Jumbotron";



function failGetFunction(error) {
    console.error(error)
}

function checkResponseStatus(response) {
    let json = {};

    if (response.status > 299) {
        // make the promise be rejected if we didn't get a 200 response
        throw new Error("API response status: " + response.status)
    } else {
        json = response.json()
    }
    return json
}

function storeToken(json) {
    sessionStorage.setItem('apiToken', json.token);
}

export default class LoginForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
        };
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm(event) {
        event.preventDefault();
        let jsonData = JSON.stringify(this.state)

        fetch('/api/v1/get_auth_token', {method: 'POST', body: jsonData})
            .then(response => checkResponseStatus(response))
            .then(result => {
                storeToken(result)
            })
            .catch(error => failGetFunction(error));

    }

    render() {
        return (
            <Jumbotron>
                <Form inline onSubmit={this.submitForm}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="userName" className="mr-sm-2">Username</Label>
                        <Input type="text" name="username" id="userName" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="userPassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="userPassword" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Jumbotron>
        );
    }
}