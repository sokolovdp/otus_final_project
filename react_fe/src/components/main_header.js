import React from "react";
import {Fragment} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import logo from "../dj.png";
import getProverb from "./latin_proverbs";

export default class MainHeader extends React.Component {

    render() {
        const proverb = getProverb();
        let userName = localStorage.getItem('userName');
        let loggedIn = (localStorage.getItem('loggedIn') === 'true');

        if (loggedIn) {
            return (
                <Fragment>
                    <Navbar expand="lg" color="grey" light>
                        <NavbarBrand href="/">
                            <img src={logo} width="30" height="30" alt="brand"/>
                        </NavbarBrand>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/">Home</NavLink>
                            </NavItem>
                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="">logged as: {userName}</NavLink>
                            </NavItem>
                            <NavItem className="d-flex align-items-center">
                                <NavLink className="font-weight-bold" href="/login">Logout</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="mx-auto" navbar>
                            <NavItem className="d-flex align-items-center">
                                {proverb}
                            </NavItem>
                        </Nav>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="d-flex align-items-center">
                                Django & React Demo Site
                            </NavItem>
                        </Nav>
                    </Navbar>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Navbar expand="lg" color="grey" light>
                    <NavbarBrand href="/">
                        <img src={logo} width="30" height="30" alt="brand"/>
                    </NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/">Home</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/register">Register</NavLink>
                        </NavItem>
                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" href="/login">Login</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="mx-auto" navbar>
                        <NavItem className="d-flex align-items-center">
                            {proverb}
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem className="d-flex align-items-center">
                            Django & React Demo Site
                        </NavItem>
                    </Nav>
                </Navbar>
            </Fragment>
        );
    }
}
