import { expect } from '@hapi/code';

import { UpdateError } from '../actions';
import { chance } from '../../../utils/test/mock';
import { UPDATE_ERROR } from '../constants';

describe('Actions(Error)', () => {
  describe('func(UpdateError)', () => {
    it('should create an action', () => {
      const error = new Error(chance.string());

      expect(UpdateError('organizations', error)).equals({
        type: UPDATE_ERROR,
        error: {
          organizations: error,
        },
      });
    });
  });
});
