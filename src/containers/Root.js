import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

import {IndexRoute, Route, Router} from 'react-router';

import  Home  from './Home/Home';
import  Login  from './Login/Login';
import  Logout  from './Logout/Logout';
import  Display  from './Display/Display';

const store = configureStore();

export default class Root extends Component {
  render() {
    // console.log(Login);
    /*
     * These are the routes that get defined, and the component is a param.
     */
    return (
      <Provider store={store}>
        {
          <Router>
            <Route path="/" component={AsyncApp}>
              <IndexRoute component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/display" component={Display}/>
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
