import fetch from 'isomorphic-fetch';

import '../css/bootstrap.css';
import { Button,
         Nav,
         Navbar,
         NavBrand,
         NavItem,
         MenuItem,
         NavDropdown } from 'react-bootstrap';

import React, { Component, PropTypes } from 'react';
import { selectDataset, fetchDataIfNeeded, invalidateDataset } from '../actions/actions';

import { IndexLink, Link } from 'react-router';

class AsyncApp extends Component {


  handleLogout = (e) => {
    const self = this;
    const input = this.refs.username;
    const pswd = this.refs.password;

    fetch(`http://52.87.224.145:3000/postRemoteLogout`, {

      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'token=' + null
      })
      .then(status)
      .then(function json(response) {
        return response.json()
      })
      .then(function(data) {
        console.log('Request succeeded with JSON response', data);
        //4031, errors
        //4032, error msg
        //2001, success msg
        if(data.customCode == 2001){
          localStorage.setItem('lastSetMsg', data.msg);
          localStorage.setItem('currentSession', 0);
          window.location.href = 'http://52.87.224.145:3001/#/logout';
        } else {
          console.error('Unable to logout, try again later');
        }
      }).catch(function(error) {
        console.error('Request failed', error);
      });
  }

  render () {
    /**
      * The are the route that get defined are in <Root>.
      * This is a component that is used as the routh path.
      */

     var loginButton, navOptions;
     if (localStorage.getItem('currentSession') == '0') {
       navOptions = <Nav>
                    </Nav>
       loginButton = <Nav right>
                      <li><a href="http://52.87.224.145:2000/">log-grower</a></li>
                      <li><Link to="/signup">Sign Up</Link></li>
                      <li><Link to="/login">Sign In</Link></li>
                     </Nav>

     } else {
       navOptions = (<Nav>
                      <NavDropdown title="Perspectives" id="basic-nav-dropdown">
                       <li header className='dropdown-header' style={{textAlign: 'center'}}>Choose a perspective</li>
                       <MenuItem divider />
                       <li><Link to="/logDisplay">Log Perspective</Link></li>
                       <li><Link to="/experienceDisplay">Experience Perspective</Link></li>
                       <li><Link to="/activityDisplay">Activitiy Perspective</Link></li>
                       <li><Link to="/reflectionDisplay">Reflection Perspective</Link></li>
                     </NavDropdown>
                   </Nav>)
       loginButton = <Nav right>
                      <li><a href="http://52.87.224.145:2000/">log-grower</a></li>
                      <li onClick={::this.handleLogout}><Link to="/logout">Sign out</Link></li>
                     </Nav>
     }

    return (
      <div>
        <Navbar className="navbar-inverse">
          <NavBrand><Link to="/">studous-display</Link></NavBrand>
          {navOptions}
          {loginButton}
        </Navbar>
        <div className="container" style={{marginTop: '5%'}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AsyncApp;
