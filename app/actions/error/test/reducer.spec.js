import { expect } from '@hapi/code';

import { UpdateError } from '../actions';
import { ErrorReducer } from '../reducer';
import { chance } from '../../../utils/test/mock';

describe('Reducer(Error)', () => {
  describe('event(UPDATE_ERROR)', () => {
    it('should set the error value in state for the given key', () => {
      const error = new Error(chance.string());

      const updatedState = ErrorReducer(
        undefined,
        UpdateError('organizations', error),
      );

      expect(updatedState).equals({
        organizations: error,
      });
    });
  });
});
