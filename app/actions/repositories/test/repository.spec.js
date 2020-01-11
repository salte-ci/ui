import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as WindowUtils from '../../../utils/window';

import { GetRepositoriesForOrganization } from '../repository';

describe('Repository(Repositories)', () => {
  describe('func(GetRepositoriesForOrganization)', () => {
    it('should return a list of repositories', async () => {
      const repositories = await GetRepositoriesForOrganization();

      expect(repositories).array();
    });

    it('should throw an error if the location.search includes "error"', async () => {
      sinon.stub(WindowUtils, 'search').returns('error');

      await expect(GetRepositoriesForOrganization()).rejects(
        Error,
        'Failed to retrieve repositories for organization.',
      );
    });
  });
});
