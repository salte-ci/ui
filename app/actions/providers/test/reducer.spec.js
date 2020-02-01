import { expect } from '@hapi/code';
import { chance } from '../../../utils/test/mock';
import { ProvidersReducer } from '../reducer';
import { UpdateProviders } from '..';

describe('Reducer(Providers)', () => {
  describe('event(UpdateProviders)', () => {
    it('should add the given providers', async () => {
      const providers = [chance.string()];

      const state = ProvidersReducer(undefined, UpdateProviders(providers));

      expect(state).equals(providers);
    });

    it('should override any existing providers', async () => {
      const state = ProvidersReducer([chance.string()], UpdateProviders([]));

      expect(state).equals([]);
    });
  });
});
