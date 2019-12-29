import { UPDATE_ERROR } from './constants';

const initialState = [];

const actions = {
  [UPDATE_ERROR]: updateError,
};

function updateError(prevState, action) {
  return {
    ...prevState,
    ...action.error,
  };
}

export function ErrorReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
