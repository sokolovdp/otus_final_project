import React from 'react';
import PropTypes from "prop-types";

export default class User extends React.Component {
    constructor(props){
        super(props);

        // from parent
        // this.state.loggedIn = props.loggedIn

        this.state = {
            loggedIn: false
        }
    }
    render() {
        return (
            <div>
                My name is {this.props.user.name}
                {/* {this.state.loggedIn && <button onClick={ (event) => console.log(event)}>Logout 1</button>} */}
                {/* {this.state.loggedIn && <button onClick={this.handleChange.bind(this)}>Logout 2</button>} */}
            </div>
        );
    }

    handleChange() {
        this.setState({
            loggedIn: !this.state.loggedIn
        });
      }

}

User.propTypes = {
    user:  PropTypes.shape({
        name: PropTypes.string,
        loggedIn: PropTypes.bool,
        accountDetails:  PropTypes.shape({
            role: PropTypes.string,
            email: PropTypes.string,
          }),
      }),
};


User.defaultProps = {
    username: 'Unknown',
    loggedIn: false,
    accountDetails: {
        role: 'Unknown',
        email: 'Unknown'
    }
};
