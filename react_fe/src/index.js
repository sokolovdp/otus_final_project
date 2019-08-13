import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'  // Link,
import * as serviceWorker from './serviceWorker';

import Main from './Main';
// import Register from './Register';
// import Login from './Login';
// import Calendar from './calendar'

import 'bootstrap/dist/css/bootstrap.css';

const routing = (
  <Router>
    <div>
      <Route path="/" component={Main} />
      {/*<Route path="/register" component={Register} />*/}
      {/*<Route path="/login" component={Login} />*/}
      {/*<Route path="/calendar" component={Calendar} />*/}
    </div>
  </Router>
);


ReactDOM.render(routing, document.getElementById('root'));

//ReactDOM.render(<Main />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

