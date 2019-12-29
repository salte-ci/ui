/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import { AuthReducer } from './actions/auth/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: AuthReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
