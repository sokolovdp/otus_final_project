import React from 'react';
import {Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Jumbotron from "reactstrap/es/Jumbotron";

export default class RegistrationForm extends React.Component {
    render() {
        return (
            <Jumbotron>
            <Form className="mx-auto">
                <Row form>
                    <Col  md={3}>
                        <FormGroup>
                            <Label for="formUsername">Username</Label>
                            <Input type="text" name="city" id="formUsername"/>
                        </FormGroup>
                    </Col>
                    <Col  md={3}>
                        <FormGroup>
                            <Label for="formPassword">Password</Label>
                            <Input type="password" name="password" id="formPassword" placeholder="new password"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form className="mx-auto">
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formEmail">Email</Label>
                            <Input type="email" name="email" id="formEmail" placeholder="your email"/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formFirstName">First Name</Label>
                            <Input type="text" name="state" id="fromFirstName"/>
                        </FormGroup>
                    </Col>
                    <Col md={2}>
                        <FormGroup>
                            <Label for="formSurname">Surname</Label>
                            <Input type="text" name="zip" id="formSurname"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Button>Sign up</Button>
            </Form>
            </Jumbotron>
        );
    }
}