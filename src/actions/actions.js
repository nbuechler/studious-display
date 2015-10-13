import fetch from 'isomorphic-fetch';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_USER = 'SELECT_USER';
export const INVALIDATE_USER = 'INVALIDATE_USER';

export function selectUSER(user) {
  return {
    type: SELECT_USER,
    user
  };
}

export function invalidateUser(user) {
  return {
    type: INVALIDATE_USER,
    user
  };
}

function requestData(user) {
  return {
    type: REQUEST_DATA,
    user
  };
}

//This is the Map part
function receiveData(user, json) {
  console.log(json);
  return {
    type: RECEIVE_DATA,
    user,
    data: json.all,
    receivedAt: Date.now()
  };
}

function fetchData(user) {
  return dispatch => {
    dispatch(requestData(user));
    // return fetch(`http://www.user.com/r/${user}.json`)
    return fetch(`http://127.0.0.1:5000/${user}`)
      .then(req => req.json())
      .then(json => dispatch(receiveData(user, json)));
  };
}

function shouldFetchData(state, user) {
  const data = state.dataByUser[user];
  if (!data) {
    return true;
  } else if (data.isFetching) {
    return false;
  } else {
    return data.didInvalidate;
  }
}

export function fetchDataIfNeeded(user) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), user)) {
      return dispatch(fetchData(user));
    }
  };
}
