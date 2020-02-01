import { expect } from '@hapi/code';
import sinon from 'sinon';
import { UpdateProviders, GetProviders } from '../actions';
import { chance, MockThunks } from '../../../utils/test/mock';
import { UPDATE_PROVIDERS } from '../constants';
import * as Repository from '../repository';

describe('Actions(Providers)', () => {
  beforeEach(() => {
    MockThunks();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('func(UpdateProviders)', () => {
    it('should create an action', () => {
      const providers = [chance.string()];

      expect(UpdateProviders(providers)).equals({
        type: UPDATE_PROVIDERS,
        providers,
      });
    });
  });

  describe('func(GetProviders)', () => {
    it('should request all of the providers', async () => {
      const providers = [chance.string()];

      const dispatch = sinon.stub();
      sinon.stub(Repository, 'GetProviders').resolves(providers);

      await GetProviders()(dispatch);

      sinon.assert.calledTwice(dispatch);
      sinon.assert.calledWithExactly(dispatch, UpdateProviders([]));
      sinon.assert.calledWithExactly(dispatch, UpdateProviders(providers));
    });
  });
});
