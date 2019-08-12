import React from "react";
import {Alert} from "reactstrap";
import PropTypes from "prop-types";

export default class PageTitle extends React.Component {
    constructor(props) {
        super(props);

        this.color = props.color;
        this.text = props.text;
    }

    render() {
        return (
            <div>
                <Alert color={this.color}>
                    {this.text}
                </Alert>
            </div>
        )
    }
}


PageTitle.propTypes = {
    params: PropTypes.shape({
        color: PropTypes.string,
        text: PropTypes.string
    }),
};


PageTitle.defaultProps = {
    color: 'secondary',
    text: 'Main page'
};
