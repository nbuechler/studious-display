import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import DocumentMeta from 'react-document-meta';
// import * as authActions from 'redux/modules/auth';

// @connect(
//   state => ({user: state.auth.user}),
//   authActions)
class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  }

  render() {
    return (
      <div>
      This is a login page
      </div>
    );
  }
}

export default Login;
