import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import AsyncApp from './AsyncApp';

import {IndexRoute, Route, Router} from 'react-router';

import  Home  from './Home/Home';
import  Signup  from './Signup/Signup';
import  Login  from './Login/Login';
import  Logout  from './Logout/Logout';
import  LogDisplay  from './LogDisplay/LogDisplay';
import  ExperienceDisplay  from './ExperienceDisplay/ExperienceDisplay';
import  ActivityDisplay  from './ActivityDisplay/ActivityDisplay';
import  ReflectionDisplay  from './ReflectionDisplay/ReflectionDisplay';

const store = configureStore();

export default class Root extends Component {
  render() {
    window.addEventListener('unload', function(){
     localStorage.setItem('currentSession', 0);
     localStorage.setItem('lastSetMsg', null);
    });
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
              <Route path="/signup" component={Signup}/>
              <Route path="/login" component={Login}/>
              <Route path="/logout" component={Logout}/>
              <Route path="/logDisplay" component={LogDisplay}/>
              <Route path="/experienceDisplay" component={ExperienceDisplay}/>
              <Route path="/activityDisplay" component={ActivityDisplay}/>
              <Route path="/reflectionDisplay" component={ReflectionDisplay}/>
            </Route>
          </Router>
        }
      </Provider>
    );
  }
}
