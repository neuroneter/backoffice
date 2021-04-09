import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import {createBrowserHistory} from 'history';

// Containers
import { DefaultLayout } from './containers';

// Pages
import { Login, Page404, Page500, Register } from './views/Pages';

// DAO
import Dao from './Actions/Dao.js'

// import { renderRoutes } from 'react-router-config';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/login" name="Login Page" component={Login} />
          <Route exact path="/register" name="Register Page" component={Register} />
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={Dao} />
        </Switch>
      </Router>
    );
  }
}

export default App;
