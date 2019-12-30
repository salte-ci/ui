import { expect } from '@hapi/code';

import { UpdateLoading } from '../actions';
import { chance } from '../../../utils/test/mock';
import { UPDATE_LOADING } from '../constants';

describe('Actions(Error)', () => {
  describe('func(UpdateLoading)', () => {
    it('should create an action', () => {
      const loading = chance.bool();

      expect(UpdateLoading('organizations', loading)).equals({
        type: UPDATE_LOADING,
        loading: {
          organizations: loading,
        },
      });
    });
  });
});
