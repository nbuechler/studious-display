import { combineReducers } from 'redux';
import {
  SELECT_DATASET, INVALIDATE_DATASET,
  REQUEST_DATA, RECEIVE_DATA
} from './actions/actions';

function selectedDataset(state = 'foo02', action) {
  switch (action.type) {
  case SELECT_DATASET:
    return action.dataset;
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
  case INVALIDATE_DATASET:
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

function dataByDataset(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_DATASET:
  case RECEIVE_DATA:
  case REQUEST_DATA:
    return Object.assign({}, state, {
      [action.dataset]: data(state[action.dataset], action)
    });
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  dataByDataset,
  selectedDataset
});

export default rootReducer;
