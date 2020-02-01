import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as Fetch from '../../../utils/fetch';

import { chance } from '../../../utils/test/mock';
import { AddLink, GetLinks, RemoveLink } from '../repository';

describe('Repository(Links)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('func(AddLink)', () => {
    it('should add a link to the given provider', async () => {
      const provider = chance.string();
      const code = chance.string();
      const expectedLink = chance.string();

      sinon.stub(Fetch, 'Fetch').resolves(expectedLink);

      const link = await AddLink(provider, code);

      expect(link).equals(expectedLink);
      sinon.assert.calledWithExactly(Fetch.Fetch, `/api/links/${provider}`, {
        body: JSON.stringify({ code }),
        method: 'post',
      });
    });
  });

  describe('func(GetLinks)', () => {
    it('should get all of links for the current user', async () => {
      const expectedLinks = [chance.string()];

      sinon.stub(Fetch, 'Fetch').resolves(expectedLinks);

      const links = await GetLinks();

      expect(links).equals(expectedLinks);
      sinon.assert.calledWithExactly(Fetch.Fetch, '/api/links');
    });
  });

  describe('func(RemoveLink)', () => {
    it('should remove a link for the given provider', async () => {
      const provider = chance.string();

      sinon.stub(Fetch, 'Fetch').resolves();

      await RemoveLink(provider);

      sinon.assert.calledWithExactly(Fetch.Fetch, `/api/links/${provider}`, {
        method: 'delete',
      });
    });
  });
});
