import { UPDATE_ORGANIZATIONS } from './constants';
import * as Repository from './repository';
import { LoadingThunk } from '../../utils/thunk';

export function UpdateOrganizations(organizations) {
  return {
    type: UPDATE_ORGANIZATIONS,
    organizations,
  };
}

export function GetOrganizationsForUser(uid) {
  return LoadingThunk('organizations', async (dispatch) => {
    dispatch(UpdateOrganizations([]));

    const organizations = await Repository.GetOrganizationsForUser(uid);

    dispatch(UpdateOrganizations(organizations));
  });
}
