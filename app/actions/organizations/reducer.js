import { UPDATE_ORGANIZATIONS } from './constants';

const initialState = [];

const actions = {
  [UPDATE_ORGANIZATIONS]: updateOrganizations,
};

function updateOrganizations(prevState, action) {
  return action.organizations;
}

export function OrganizationsReducer(state = initialState, action) {
  const reducer = actions[action.type];

  return reducer ? reducer(state, action) : state;
}
