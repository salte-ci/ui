import { expect } from '@hapi/code';
import sinon from 'sinon';
import { chance } from '../../../utils/test/mock';
import { GetProviders } from '../repository';
import * as Fetch from '../../../utils/fetch';

describe('Repository(Providers)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('func(GetProviders)', () => {
    it('should fetch the providers', async () => {
      const expectedProviders = [chance.string()];

      sinon.stub(Fetch, 'Fetch').resolves(expectedProviders);

      const providers = await GetProviders();

      expect(providers).equals(expectedProviders);
      sinon.assert.calledWithExactly(Fetch.Fetch, '/api/providers');
    });
  });
});
