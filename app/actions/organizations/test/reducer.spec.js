import { expect } from '@hapi/code';

import { UpdateOrganizations } from '../actions';
import { OrganizationsReducer } from '../reducer';
import { chance } from '../../../utils/test/mock';

describe('Reducer(Organizations)', () => {
  describe('event(UPDATE_ORGANIZATIONS)', () => {
    it('should update the organizations', () => {
      const organizations = [chance.string()];
      const state = OrganizationsReducer(undefined, UpdateOrganizations(organizations));

      expect(state).equals(organizations);
    });
  });
});
