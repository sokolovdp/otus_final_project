import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Switch} from 'react-router-dom'  // Link,
import * as serviceWorker from './serviceWorker';

import Main from './Main';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
// import Calendar from './calendar'
import NotFound from './components/notfound'

import 'bootstrap/dist/css/bootstrap.css';

// Initialize Local Storage with User Data
if (localStorage.getItem('userName' == null))
    localStorage.setItem('userName', 'Unknown');
if (localStorage.getItem('token' == null))
    localStorage.setItem('token', '');
if (localStorage.getItem('loggedIn' == null))
    localStorage.setItem('loggedIn', 'false');

const routing = (
    <BrowserRouter>
        <div>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                {/*<Route path="/calendar" component={Calendar} />*/}
                <Route component={NotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
);

ReactDOM.render(routing, document.getElementById('root'));

//ReactDOM.render(<Main />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

