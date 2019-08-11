import React from "react";
import {Fragment} from 'react';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from "reactstrap";
import logo from "../dj.png";
import PropTypes from "prop-types";
import getProverb from "./latin_proverbs";

export default class MainHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;
    }

    render() {
        const proverb = getProverb();

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

MainHeader.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool,
        accountDetails: PropTypes.shape({
            role: PropTypes.string,
            email: PropTypes.string,
        }),
    }),
};

MainHeader.defaultProps = {
    username: 'Unknown',
    loggedIn: false,
    accountDetails: {
        role: '',
        email: ''
    }
};
