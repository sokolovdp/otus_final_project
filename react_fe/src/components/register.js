import React from 'react';

import MainHeader from './main_header'
import PageTitle from './page_title'
import PageContent from './page_content'


function Register() {

    return (
        <div className="Register">
            <MainHeader/>
            <PageTitle
                color = 'warning'
                text = 'Register page'
            />
            <PageContent/>
        </div>
    );
}

export default Register;
