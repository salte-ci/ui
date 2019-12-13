import { Chance } from 'chance';
import { Utils } from '@salte-auth/salte-auth';
import { expect } from '@hapi/code';

import { UPDATE_TOKEN } from '../constants';

import { AuthReducer } from '../reducer';

const chance = Chance();

describe('<App /> - Global Reducers', () => {
  describe('function(AuthReducer)', () => {
    it('should default the state', () => {
      const updatedState = AuthReducer(undefined, { type: null });

      expect(updatedState.idTokens.auth0).instanceOf(Utils.IDToken);
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

        expect(updatedState.idTokens.auth0).equals(auth0Token);
      });

      it('should support removing a token', () => {
        const updatedState = AuthReducer(undefined, {
          type: UPDATE_TOKEN,
          tokens: {
            auth0: null,
          },
        });

        expect(updatedState.idTokens.auth0).equals(undefined);
      });

      it('should merge the token changes with the existing state', () => {
        const state = {
          idTokens: {
            auth0: chance.string(),
            github: chance.string(),
            gitlab: chance.string(),
          },
        };
        const newAuth0Token = chance.string();
        const updatedState = AuthReducer(state, {
          type: UPDATE_TOKEN,
          tokens: {
            auth0: newAuth0Token,
          },
        });

        expect(updatedState.idTokens).equals({
          ...state.idTokens,
          auth0: newAuth0Token,
        });
      });
    });
  });
});
