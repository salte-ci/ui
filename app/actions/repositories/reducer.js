import { UPDATE_REPOSITORIES } from './constants';

const initialState = {};

const actions = {
  [UPDATE_REPOSITORIES]: updateRepositories,
};

function updateRepositories(prevState, action) {
  return {
    ...prevState,
    ...action.repositories,
  };
}

export function RepositoriesReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
