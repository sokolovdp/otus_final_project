import React from 'react';
import logo from './dj.png';
import main_page_pic from './main_page_picture.jpg';
import './App.css';

import {Fragment} from 'react';
import {
    Container, Alert, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button,
} from 'reactstrap';


class activeUser {
    constructor(username, authenticated) {
        this.username = username;
        this.authenticated = authenticated;
    }
}

class pageTitleParams {
    constructor(color, text) {
        this.color = color;
        this.text = text;
    }
}

function App() {
    return (
        <div className="App">
            <MainHeader user={new activeUser("dima", false)}/>
            <PageTitle params={new pageTitleParams('secondary', "Main page")} />
            <PageContent content={'content'} />
        </div>
    );
}

export default App;

class MainHeader extends React.Component {
    render() {
        return (
            <Fragment>
                <Navbar expand="lg" color="grey" light mr-auto>
                    <NavbarBrand href="/">
                        <img src={logo} width="30" height="30" alt="brand"/>
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="#">Register</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="#">Login</NavLink>
                        </NavItem>
                    </Nav>
                    {<span className="navbar-text mr-auto proverb">Latin Proverb of the Day</span>}
                    {<span className="navbar-text right">Django & React Demo Site</span>}
                </Navbar>
            </Fragment>
        );
    }
}

class PageTitle extends React.Component {
    render() {
        return (
            <div>
                <Alert color={this.props.params.color}>
                    {this.props.params.text}
                </Alert>
            </div>
        )
    }
}

class PageContent extends React.Component {
    render() {
        return (
            <Container>
                {this.props.content}
            </Container>
        )
    }
}