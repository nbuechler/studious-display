import '../css/bootstrap.css';
import { Button,
         Nav,
         Navbar,
         NavBrand,
         NavItem,
         MenuItem,
         NavDropdown } from 'react-bootstrap';

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
    /*
     * The are the route that get defined are in <Root>.
     * This is a component that is used as the routh path.
     */
    return (
      <div>
        <Navbar>
          <NavBrand><IndexLink to="/">studious-display</IndexLink></NavBrand>
          <Nav>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/display">Display</Link></li>
            <NavDropdown title="Change me!" id="basic-nav-dropdown">
              <li><Link to="/a">a</Link></li>
              <li><Link to="/b">b</Link></li>
              <li><Link to="/c">c</Link></li>
              <MenuItem divider />
              <li><Link to="/d">d</Link></li>
            </NavDropdown>
          </Nav>
        </Navbar>
        <div style={{margin: '5%', padding: '5%'}}>
          {this.props.children}
        </div>
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
