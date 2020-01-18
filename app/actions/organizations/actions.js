import { UPDATE_ORGANIZATIONS } from './constants';
import * as Repository from './repository';
import { UpdateLoading } from '../loading/actions';
import { UpdateError } from '../error/actions';

export function UpdateOrganizations(organizations) {
  return {
    type: UPDATE_ORGANIZATIONS,
    organizations,
  };
}

export function GetOrganizationsForUser(uid) {
  return async (dispatch) => {
    try {
      dispatch(UpdateError('organizations', null));
      dispatch(UpdateOrganizations([]));
      dispatch(UpdateLoading('organizations', true));

      const organizations = await Repository.GetOrganizationsForUser(uid);

      dispatch(UpdateOrganizations(organizations));
    } catch (error) {
      dispatch(UpdateError('organizations', error));
    } finally {
      dispatch(UpdateLoading('organizations', false));
    }
  };
}
