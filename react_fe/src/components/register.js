import React from 'react';

import MainHeader from './main_header'
import PageTitle from './page_title'
import RegistrationForm from "./registration_form";


export default function Register() {

    return (
        <div className="Register">
            <MainHeader/>
            <PageTitle
                color = 'warning'
                text = 'Register page'
            />
            <RegistrationForm/>
        </div>
    );
}
