import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
import { selectUser, fetchDataIfNeeded, invalidateUser } from '../actions/actions';

import { IndexLink, Link } from 'react-router';

class AsyncApp extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  //   this.handleRefreshClick = this.handleRefreshClick.bind(this);
  // }
  //
  // componentDidMount() {
  //   const { dispatch, selectedUser } = this.props;
  //   dispatch(fetchDataIfNeeded(selectedUser));
  // }
  //
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.selectedUser !== this.props.selectedUser) {
  //     const { dispatch, selectedUser } = nextProps;
  //     dispatch(fetchDataIfNeeded(selectedUser));
  //   }
  // }
  //
  // handleChange(nextUser) {
  //   this.props.dispatch(selectUser(nextUser));
  // }
  //
  // handleRefreshClick(e) {
  //   e.preventDefault();
  //
  //   const { dispatch, selectedUser } = this.props;
  //   dispatch(invalidateUser(selectedUser));
  //   dispatch(fetchDataIfNeeded(selectedUser));
  // }

  render () {
    // const { selectedUser, data, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><IndexLink to="/">Home</IndexLink></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/display">Display</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

// AsyncApp.propTypes = {
//   selectedUser: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   isFetching: PropTypes.bool.isRequired,
//   lastUpdated: PropTypes.number,
//   dispatch: PropTypes.func.isRequired
// };
//
// function mapStateToProps(state) {
//   const { selectedUser, dataByUser } = state;
//   const {
//     isFetching,
//     lastUpdated,
//     items: data
//   } = dataByUser[selectedUser] || {
//     isFetching: true,
//     items: []
//   };
//
//   return {
//     selectedUser,
//     data,
//     isFetching,
//     lastUpdated
//   };
// }

// export default connect(mapStateToProps)(AsyncApp);
export default AsyncApp;
