import { expect } from '@hapi/code';
import sinon from 'sinon';

import { chance, MockLink } from '../../../utils/test/mock';
import { LinksReducer } from '../reducer';
import { AddLinks, ResetLink } from '..';

describe('Reducer(Links)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('event(AddLinks)', () => {
    it('should add the given links to state', async () => {
      const links = [chance.string()];

      const state = LinksReducer(undefined, AddLinks(links));

      expect(state).equals(links);
    });
  });

  describe('event(ResetLink)', () => {
    it('should remove the link with the given id from state', async () => {
      const link = MockLink();

      const state = LinksReducer([link], ResetLink(link.provider_id));

      expect(state).equals([]);
    });

    it('should ignore the request if the link is already removed', async () => {
      const link = MockLink();

      const state = LinksReducer([link], ResetLink(chance.string()));

      expect(state).equals([link]);
    });
  });
});
