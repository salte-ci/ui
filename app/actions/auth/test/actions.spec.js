import { expect } from '@hapi/code';

import { UPDATE_TOKEN } from '../constants';

import { UpdateToken } from '../actions';

describe('Actions(Auth)', () => {
  describe('function(UpdateToken)', () => {
    it('should create a token update action', () => {
      const action = UpdateToken('auth0', 'token');

      expect(action).equals({
        type: UPDATE_TOKEN,
        tokens: {
          auth0: 'token',
        },
      });
    });
  });
});
