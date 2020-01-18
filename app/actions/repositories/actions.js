import { UPDATE_REPOSITORIES } from './constants';
import * as Repository from './repository';
import { UpdateLoading } from '../loading/actions';
import { UpdateError } from '../error/actions';

export function UpdateRepositories(organizationID, repositories) {
  return {
    type: UPDATE_REPOSITORIES,
    repositories: {
      [organizationID]: repositories,
    },
  };
}

export function GetRepositoriesForOrganization(organizationID) {
  return async (dispatch) => {
    try {
      dispatch(UpdateError(`repositories:${organizationID}`, null));
      dispatch(UpdateRepositories(organizationID, []));
      dispatch(UpdateLoading(`repositories:${organizationID}`, true));

      const repositories = await Repository.GetRepositoriesForOrganization(
        organizationID,
      );

      dispatch(UpdateRepositories(organizationID, repositories));
    } catch (error) {
      dispatch(UpdateError(`repositories:${organizationID}`, error));
    } finally {
      dispatch(UpdateLoading(`repositories:${organizationID}`, false));
    }
  };
}
