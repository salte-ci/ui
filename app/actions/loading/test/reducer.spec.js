import { expect } from '@hapi/code';

import { UpdateLoading } from '../actions';
import { LoadingReducer } from '../reducer';
import { chance } from '../../../utils/test/mock';

describe('Reducer(Error)', () => {
  describe('event(UPDATE_LOADING)', () => {
    it('should set the loading value in state for the given key', () => {
      const loading = chance.bool();

      const updatedState = LoadingReducer(undefined, UpdateLoading('organizations', loading));

      expect(updatedState).equals({
        organizations: loading,
      });
    });
  });
});
