import React from 'react';
import './App.css';

import Jumbotron from "reactstrap/es/Jumbotron";

import MainHeader from './components/main_header'
import PageTitle from './components/page_title'

class activeUser {
    constructor(username, authenticated) {
        this.username = username;
        this.authenticated = authenticated;
    }
}

class pageTitleParams {
    constructor(color, text) {
        this.color = color;
        this.text = text;
    }
}

function App() {
    return (
        <div className="App">
            <MainHeader user={new activeUser(null, false)}/>
            <PageTitle params={new pageTitleParams('secondary', "Main page")}/>
            <PageContent content={null}/>
        </div>
    );
}

export default App;


class PageContent extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron>
                    {this.props.content}
                </Jumbotron>
            </div>
        )
    }
}