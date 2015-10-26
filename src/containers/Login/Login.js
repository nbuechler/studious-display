import fetch from 'isomorphic-fetch';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import DocumentMeta from 'react-document-meta';
// import * as authActions from 'redux/modules/auth';

// @connect(
//   state => ({user: state.auth.user}),
//   authActions)
class Login extends Component {
  static propTypes = {
    // user: PropTypes.object,
    // login: PropTypes.func,
    // logout: PropTypes.func
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    const pswd = this.refs.password;

    fetch(`http://localhost:3000/postRemoteLogin`, {

      method: 'post',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: 'email=' + input.value + '&password=' + pswd.value
      })
      .then(status)
      .then(function json(response) {
        return response.json()
      })
      .then(function(data) {
        console.log('Request succeeded with JSON response', data);
        if(data.status == 'Success'){
          window.location.href = 'http://localhost:3001/#/display';
        }
      }).catch(function(error) {
        console.log('Request failed', error);
      });
    // input.value = '';
    // pswd.value = '';
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        {true &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input className="form-control" type="text" ref="username" placeholder="Enter a username"/>
            <br></br>
            <input className="form-control" type="password" ref="password" placeholder="Enter a username"/>
            <br></br>
            <button className="btn btn-success pull-right" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
        }
      </div>
    );
  }
}

export default Login;
