import { Utils } from '@salte-auth/salte-auth';
import { expect } from '@hapi/code';

import { chance } from '../../../utils/test/mock';

import { UPDATE_TOKEN } from '../constants';

import { AuthReducer } from '../reducer';

describe('Reducer(Auth)', () => {
  describe('function(AuthReducer)', () => {
    it('should default the state', () => {
      const updatedState = AuthReducer(undefined, { type: null });

      expect(updatedState.auth0).instanceOf(Utils.IDToken);
    });

    describe('event(UPDATE_TOKEN)', () => {
      it('should support updating a token', () => {
        const auth0Token = chance.string();
        const updatedState = AuthReducer(undefined, {
          type: UPDATE_TOKEN,
          tokens: {
            auth0: auth0Token,
          },
        });

        expect(updatedState.auth0).equals(auth0Token);
      });

      it('should merge the token changes with the existing state', () => {
        const state = {
          auth0: chance.string(),
          github: chance.string(),
          gitlab: chance.string(),
        };
        const newAuth0Token = chance.string();
        const updatedState = AuthReducer(state, {
          type: UPDATE_TOKEN,
          tokens: {
            auth0: newAuth0Token,
          },
        });

        expect(updatedState).equals({
          ...state,
          auth0: newAuth0Token,
        });
      });
    });
  });
});
