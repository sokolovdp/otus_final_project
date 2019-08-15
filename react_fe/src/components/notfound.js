import React from 'react'
import {Alert} from "reactstrap";

import MainHeader from './main_header'
import PageTitle from './page_title'
import PageContent from './page_content'


class Error404 extends React.Component {
    render() {
        return (
            <div>
                <Alert color={"danger"}>
                    <p className="text-center">{"404 - Page not found"}</p>
                </Alert>
            </div>
        )
    }
}

export default function NotFound() {

    return (
        <div className="Register">
            <MainHeader/>
            <PageTitle
                color = 'danger'
                text = 'Error'
            />
            <PageContent
                content = {Error404}
            />
        </div>
    );
}