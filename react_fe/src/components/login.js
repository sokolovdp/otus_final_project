import React from 'react';

import MainHeader from './main_header'
import PageTitle from './page_title'
import PageContent from './page_content'
import LoginForm from "../login_form";


export default function Login() {

    return (
        <div className="Login">
            <MainHeader/>
            <PageTitle
                color = 'info'
                text = 'Login page'
            />
            <LoginForm/>
        </div>
    );
}