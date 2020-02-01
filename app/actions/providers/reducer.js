import { UPDATE_PROVIDERS } from './constants';

const initialState = [];

const actions = {
  [UPDATE_PROVIDERS]: updateProviders,
};

function updateProviders(prevState, action) {
  return action.providers;
}

export function ProvidersReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
