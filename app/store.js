/**
 * Create the store with dynamic reducers
 */

import { createStore } from 'redux';
import { createReducer } from './reducers';

export function configureStore(initialState = {}, dispatch) {
  const store = createStore(createReducer(), initialState);

  if (dispatch) {
    store.dispatch = dispatch;
  }

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
