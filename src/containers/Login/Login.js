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
    // this.props.login(input.value);
    input.value = '';
    pswd.value = '';
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
