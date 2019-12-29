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
          auth0: 'world',
        },
      });

      expect(store.getState().auth).equals({
        auth0: 'world',
      });
    });
  });
});
