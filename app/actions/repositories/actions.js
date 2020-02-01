import { UPDATE_REPOSITORIES } from './constants';
import * as Repository from './repository';
import { LoadingThunk } from '../../utils/thunk';

export function UpdateRepositories(organizationID, repositories) {
  return {
    type: UPDATE_REPOSITORIES,
    repositories: {
      [organizationID]: repositories,
    },
  };
}

export function GetRepositoriesForOrganization(organizationID) {
  return LoadingThunk(`repositories:${organizationID}`, async (dispatch) => {
    dispatch(UpdateRepositories(organizationID, []));

    const repositories = await Repository.GetRepositoriesForOrganization(
      organizationID,
    );

    dispatch(UpdateRepositories(organizationID, repositories));
  });
}
