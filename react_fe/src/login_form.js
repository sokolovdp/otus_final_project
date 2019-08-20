import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Jumbotron from "reactstrap/es/Jumbotron";

export default class LoginForm extends React.Component {
    render() {
        return (
            <Jumbotron>
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="userName" className="mr-sm-2">Username</Label>
                        <Input type="text" name="username" id="userName"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="formPassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="formPassword"/>
                    </FormGroup>
                    <Button>Submit</Button>
                </Form>
            </Jumbotron>
        );
    }
}