import { RESET_LINK, ADD_LINKS } from './constants';

const initialState = [];

const actions = {
  [RESET_LINK]: resetLink,
  [ADD_LINKS]: addLinks,
};

function resetLink(prevState, action) {
  const state = [...prevState];

  const index = state.findIndex((link) => link.provider_id === action.provider);

  if (index !== -1) {
    state.splice(index, 1);
  }

  return state;
}

function addLinks(prevState, action) {
  return [...prevState, ...action.links];
}

export function LinksReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
