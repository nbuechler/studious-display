import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

import {IndexRoute, Route, Router} from 'react-router';
import {
    Home,
    Login
  } from '../containers';


const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        {
          <Router>
            <Route path="/" component={AsyncApp}>
              <IndexRoute component={Home}/>
              <Route path="login" component={Login}/>
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
