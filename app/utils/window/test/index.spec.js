import { expect } from '@hapi/code';
import sinon from 'sinon';

import { origin, search, reload } from '../index';
import { chance } from '../../test/mock';

describe('WindowUtils', () => {
  describe('func(origin)', () => {
    it('should return the origin', () => {
      const location = {
        origin: chance.url(),
      };

      expect(origin(location)).equals(location.origin);
    });
  });

  describe('func(search)', () => {
    it('should return the search', () => {
      const location = {
        search: chance.url(),
      };

      expect(search(location)).equals(location.search);
    });
  });

  describe('func(reload)', () => {
    it('should reload the page', () => {
      const location = {
        reload: sinon.stub(),
      };

      reload(location);

      sinon.assert.calledOnce(location.reload);
    });
  });
});
