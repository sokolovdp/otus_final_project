import React from "react";
import Jumbotron from "reactstrap/es/Jumbotron";

import main_page_pic from '../main_page_picture.jpg';
import PropTypes from "prop-types";


export default class PageContent extends React.Component {
    constructor(props) {
        super(props);

        this.content = props.content;
    }

    render() {
        return (
            <Jumbotron>
                {this.content}
            </Jumbotron>
        )
    }
}


PageContent.propTypes = {
    content: PropTypes.element
};

PageContent.defaultProps = {
    content: <img src={main_page_pic} className="img-fluid mx-auto d-block" alt={"main-alt"}/>
    // content: <div>Some String</div>
};