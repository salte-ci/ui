import { UPDATE_LOADING } from './constants';

const initialState = {};

const actions = {
  [UPDATE_LOADING]: updateLoading,
};

function updateLoading(prevState, action) {
  return {
    ...prevState,
    ...action.loading,
  };
}

export function LoadingReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
