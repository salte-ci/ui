import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as Repository from '../repository';
import { UpdateRepositories, GetRepositoriesForOrganization } from '../actions';
import { chance } from '../../../utils/test/mock';
import { UPDATE_REPOSITORIES } from '../constants';
import { UpdateError } from '../../error';
import { UpdateLoading } from '../../loading';

describe('Actions(Repositories)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('func(UpdateRepositories)', () => {
    it('should create an action', () => {
      const organizationID = chance.string();
      const repositories = [chance.string()];

      expect(UpdateRepositories(organizationID, repositories)).equals({
        type: UPDATE_REPOSITORIES,
        repositories: {
          [organizationID]: repositories,
        },
      });
    });
  });

  describe('func(GetRepositoriesForOrganization)', () => {
    it('should request the repositories and dispatch updates to state', async () => {
      const dispatch = sinon.stub();
      const expectedOrganizationID = chance.string();

      const repositories = [chance.string()];
      sinon.stub(Repository, 'GetRepositoriesForOrganization').callsFake(async uid => {
        expect(uid).equals(expectedOrganizationID);

        sinon.assert.calledThrice(dispatch);
        sinon.assert.calledWithExactly(dispatch, UpdateError(`repositories:${expectedOrganizationID}`, null));
        sinon.assert.calledWithExactly(dispatch, UpdateRepositories(expectedOrganizationID, []));
        sinon.assert.calledWithExactly(dispatch, UpdateLoading(`repositories:${expectedOrganizationID}`, true));

        return repositories;
      });

      await GetRepositoriesForOrganization(expectedOrganizationID)(dispatch);

      sinon.assert.callCount(dispatch, 5);
      sinon.assert.calledWithExactly(dispatch, UpdateRepositories(expectedOrganizationID, repositories));
      sinon.assert.calledWithExactly(dispatch, UpdateLoading(`repositories:${expectedOrganizationID}`, false));
    });

    it('should support failures to retrieve the repositories', async () => {
      const dispatch = sinon.stub();
      const expectedOrganizationID = chance.string();

      const error = new Error('Whoops');

      sinon.stub(Repository, 'GetRepositoriesForOrganization').callsFake(async uid => {
        expect(uid).equals(expectedOrganizationID);

        sinon.assert.calledThrice(dispatch);
        sinon.assert.calledWithExactly(dispatch, UpdateError(`repositories:${expectedOrganizationID}`, null));
        sinon.assert.calledWithExactly(dispatch, UpdateRepositories(expectedOrganizationID, []));
        sinon.assert.calledWithExactly(dispatch, UpdateLoading(`repositories:${expectedOrganizationID}`, true));

        throw error;
      });

      await GetRepositoriesForOrganization(expectedOrganizationID)(dispatch);

      sinon.assert.callCount(dispatch, 5);
      sinon.assert.calledWithExactly(dispatch, UpdateError(`repositories:${expectedOrganizationID}`, error));
      sinon.assert.calledWithExactly(dispatch, UpdateLoading(`repositories:${expectedOrganizationID}`, false));
    });
  });
});
