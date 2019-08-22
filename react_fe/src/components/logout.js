import React from 'react';
import {Redirect} from 'react-router-dom'


export default class Logout extends React.Component {
    render() {
        localStorage.setItem('userName', '');
        localStorage.setItem('token', '');
        localStorage.setItem('loggedIn', 'false');

        return <Redirect to="/"/>;
    }
}