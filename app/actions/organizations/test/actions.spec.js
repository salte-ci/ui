import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as Repository from '../repository';
import { GetOrganizationsForUser, UpdateOrganizations } from '../actions';
import { chance } from '../../../utils/test/mock';
import { UPDATE_ORGANIZATIONS } from '../constants';
import { UpdateError } from '../../error';
import { UpdateLoading } from '../../loading';

describe('Actions(Organizations)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('func(UpdateOrganizations)', () => {
    it('should create an action', () => {
      const organizations = [chance.string()];

      expect(UpdateOrganizations(organizations)).equals({
        type: UPDATE_ORGANIZATIONS,
        organizations,
      });
    });
  });

  describe('func(GetOrganizationsForUser)', () => {
    it('should request the organizations and dispatch updates to state', async () => {
      const dispatch = sinon.stub();
      const expectedUid = chance.string();

      const organizations = [chance.string()];
      sinon.stub(Repository, 'GetOrganizationsForUser').callsFake(async uid => {
        expect(uid).equals(expectedUid);

        sinon.assert.calledThrice(dispatch);
        sinon.assert.calledWithExactly(dispatch, UpdateError('organizations', null));
        sinon.assert.calledWithExactly(dispatch, UpdateOrganizations([]));
        sinon.assert.calledWithExactly(dispatch, UpdateLoading('organizations', true));

        return organizations;
      });

      await GetOrganizationsForUser(expectedUid)(dispatch);

      sinon.assert.callCount(dispatch, 5);
      sinon.assert.calledWithExactly(dispatch, UpdateOrganizations(organizations));
      sinon.assert.calledWithExactly(dispatch, UpdateLoading('organizations', false));
    });

    it('should support failures to retrieve the organizations', async () => {
      const dispatch = sinon.stub();
      const expectedUid = chance.string();

      const error = new Error('Whoops');

      sinon.stub(Repository, 'GetOrganizationsForUser').callsFake(async uid => {
        expect(uid).equals(expectedUid);

        sinon.assert.calledThrice(dispatch);
        sinon.assert.calledWithExactly(dispatch, UpdateError('organizations', null));
        sinon.assert.calledWithExactly(dispatch, UpdateOrganizations([]));
        sinon.assert.calledWithExactly(dispatch, UpdateLoading('organizations', true));

        throw error;
      });

      await GetOrganizationsForUser(expectedUid)(dispatch);

      sinon.assert.callCount(dispatch, 5);
      sinon.assert.calledWithExactly(dispatch, UpdateError('organizations', error));
      sinon.assert.calledWithExactly(dispatch, UpdateLoading('organizations', false));
    });
  });
});
