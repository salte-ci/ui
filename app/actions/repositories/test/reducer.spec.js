import { expect } from '@hapi/code';

import { UpdateRepositories } from '../actions';
import { RepositoriesReducer } from '../reducer';
import { chance } from '../../../utils/test/mock';

describe('Reducer(Organizations)', () => {
  describe('event(UPDATE_REPOSITORIES)', () => {
    it('should update the organizations', () => {
      const organizationID = chance.string();
      const repositories = [chance.string()];
      const state = RepositoriesReducer(undefined, UpdateRepositories(organizationID, repositories));

      expect(state).equals({
        [organizationID]: repositories,
      });
    });
  });
});
