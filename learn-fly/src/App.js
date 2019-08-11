import React from 'react';
import logo from './dj.png';
import main_page_pic from './main_page_picture.jpg';
import './App.css';

import {Fragment} from 'react';
import {
    Container, Row, Col, Navbar, NavbarBrand, Nav, NavItem, NavLink, Button,
} from 'reactstrap';


class activeUser {
    constructor(username, authenticated) {
        this.username = username;
        this.authenticated = authenticated;
    }
}


function App() {
    return (
        <div className="App">
            <MainHeader user={new activeUser("dima", false)}/>
            <img src={main_page_pic} alt="main_pic"/>
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
                    {<span className="navbar-text mr-auto phrase">Latin Proverb of the Day</span>}
                    {<span className="navbar-text right">Django & React Demo Site</span>}
                </Navbar>
            </Fragment>
        );
    }
}