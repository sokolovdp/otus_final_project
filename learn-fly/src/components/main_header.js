import React from "react";
import {Fragment} from 'react';
import {Container, Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import logo from "../dj.png";

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

export default MainHeader;