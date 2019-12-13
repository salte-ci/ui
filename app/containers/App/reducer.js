import { UPDATE_TOKEN } from './constants';

import { auth } from '../../auth';

const initialState = {
  idTokens: {
    auth0: auth.provider('auth0').idToken,
  },
};

const actions = {
  [UPDATE_TOKEN]: updateToken,
};

function updateToken(prevState, action) {
  const state = {
    ...prevState,
  };

  Object.entries(action.tokens).forEach(([key, value]) => {
    if (value) state.idTokens[key] = value;
    else delete state.idTokens[key];
  });

  return state;
}

export function AuthReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
