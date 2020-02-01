import { UPDATE_TOKEN } from './constants';

import { auth } from '../../auth';

const initialState = {
  auth0: auth.provider('auth0').idToken,
  bitbucket: auth.provider('bitbucket').code,
  github: auth.provider('github').code,
  gitlab: auth.provider('gitlab').code,
};

const actions = {
  [UPDATE_TOKEN]: updateToken,
};

function updateToken(prevState, action) {
  return {
    ...prevState,
    ...action.tokens,
  };
}

export function AuthReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
