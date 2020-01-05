/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';

import { AuthReducer } from './actions/auth/reducer';
import { ErrorReducer } from './actions/error/reducer';
import { LoadingReducer } from './actions/loading/reducer';
import { OrganizationsReducer } from './actions/organizations/reducer';
import { RepositoriesReducer } from './actions/repositories/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    auth: AuthReducer,
    error: ErrorReducer,
    loading: LoadingReducer,
    organizations: OrganizationsReducer,
    repositories: RepositoriesReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
