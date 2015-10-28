import fetch from 'isomorphic-fetch';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showError: false,
      showSuccess: false,
      message: 'hello',
    }
  }

  handleSubmit = (e) => {
    const self = this;
    const input = this.refs.username;
    const pswd = this.refs.password;

    console.log(this, 'here;');


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
        //4031, errors
        //4032, error msg
        //2001, success msg
        if(data.customCode == 2001){
          window.location.href = 'http://localhost:3001/#/display';
        } else if (data.customCode == 4031) {
          self.setState({showError: true});
          self.setState({message: 'lots of errors'});
        } else if (data.customCode == 4032) {
          self.setState({showError: true});
          self.setState({message: data.msg});
        } else {
          console.error('Unable to login, try again later');
        }
      }).catch(function(error) {
        console.error('Request failed', error);
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        { this.state.showError ? this.state.message : null }
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
      </div>
    );
  }
}

export default Login;
