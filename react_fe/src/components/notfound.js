import React from 'react'
import {Alert} from "reactstrap";

import MainHeader from './main_header'
import PageTitle from './page_title'
import PageContent from './page_content'


export default function NotFound() {
    return (
        <div className="Register">
            <MainHeader/>
            <PageTitle
                color='danger'
                text='Error'
            />
            <PageContent
                content={<p className="text-center">{"404 - Page not found"}</p>}
            />
        </div>
    );
}