import { combineReducers } from 'redux';
import {
  SELECT_USER, INVALIDATE_USER,
  REQUEST_DATA, RECEIVE_DATA
} from './actions/actions';

function selectedUser(state = 'foo01', action) {
  switch (action.type) {
  case SELECT_USER:
    return action.user;
  default:
    return state;
  }
}

function data(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
  case INVALIDATE_USER:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case REQUEST_DATA:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case RECEIVE_DATA:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      items: action.data,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

function dataByUser(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_USER:
  case RECEIVE_DATA:
  case REQUEST_DATA:
    return Object.assign({}, state, {
      [action.user]: data(state[action.user], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  dataByUser,
  selectedUser
});

export default rootReducer;
