import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default class LoginForm extends React.Component {
  render() {
    return (
      <Form inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="userName" className="mr-sm-2">Email</Label>
          <Input type="text" name="username" id="userName" placeholder="something" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="don't tell!" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}