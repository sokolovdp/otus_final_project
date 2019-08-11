import React from "react";
import {Alert} from "reactstrap";

class PageTitle extends React.Component {
    render() {
        return (
            <div>
                <Alert color={this.props.params.color}>
                    {this.props.params.text}
                </Alert>
            </div>
        )
    }
}

export default PageTitle