import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input} from 'reactstrap';

export default class RegistrationForm extends React.Component {
  render() {
    return (
      <Form>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="formEmail">Email</Label>
              <Input type="email" name="email" id="formEmail" placeholder="your email" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="formPassword">Password</Label>
              <Input type="password" name="password" id="formPassword" placeholder="new password" />
            </FormGroup>
          </Col>
        </Row>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label for="formUsername">Username</Label>
              <Input type="text" name="city" id="formUsername"/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="formFirstName">First Name</Label>
              <Input type="text" name="state" id="fromFirstName"/>
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label for="formSurname">Surname</Label>
              <Input type="text" name="zip" id="formSurname"/>
            </FormGroup>
          </Col>
        </Row>
        <Button>Sign up</Button>
      </Form>
    );
  }
}