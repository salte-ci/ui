/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createReducer } from './reducers';

export function configureStore(initialState = {}, dispatch) {
  let composeEnhancers = compose;

  /* istanbul ignore next */
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ serialize: true });
  }

  const store = createStore(createReducer(), initialState, composeEnhancers(applyMiddleware(ReduxThunk)));

  if (dispatch) {
    store.dispatch = dispatch;
  }

  // Extensions
  store.injectedReducers = {}; // Reducer registry

  return store;
}
