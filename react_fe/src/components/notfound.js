import React from 'react'
import {Alert} from "reactstrap";


export default class NotFound extends React.Component {
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