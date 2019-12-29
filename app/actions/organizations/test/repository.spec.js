import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as WindowUtils from '../../../utils/window';

import { GetOrganizationsForUser } from '../repository';

describe('Repository(Organizations)', () => {
  describe('func(GetOrganizationsForUser)', () => {
    it('should return a list of organizations', async () => {
      const organizations = await GetOrganizationsForUser();

      expect(organizations.length).equals(3);
    });

    it('should throw an error if the location.search includes "error"', async () => {
      sinon.stub(WindowUtils, 'search').returns('error');

      await expect(GetOrganizationsForUser()).rejects(Error, 'Failed to retrieve organizations for user.');
    });
  });
});
