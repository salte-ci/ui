import { expect } from '@hapi/code';

import { configureStore } from '../store';

describe('Store', () => {
  describe('function(configureStore)', () => {
    it('should setup the state', () => {
      const store = configureStore();

      expect(store.getState()).not.equals(undefined);
    });

    it('should support overriding state', () => {
      const store = configureStore({
        auth: {
          idTokens: {
            auth0: 'world',
          },
        },
      });

      expect(store.getState().auth.idTokens).equals({
        auth0: 'world',
      });
    });
  });
});
