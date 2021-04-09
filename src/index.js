import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import {createBrowserHistory} from 'history';

// DAO
import Dao from './Reducers/Dao.js'

// Pages
import { Page404, Page500, Register } from './views/Pages';

// import { renderRoutes } from 'react-router-config';
const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <Switch>
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={Dao} />
        </Switch>
      </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();