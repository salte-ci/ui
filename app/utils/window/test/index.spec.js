import { expect } from '@hapi/code';
import sinon from 'sinon';

import { origin, search, reload, innerWidth, addEventListener, removeEventListener } from '../index';
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

  describe('func(innerWidth)', () => {
    it('should return the innerWidth', () => {
      const window = {
        innerWidth: chance.integer(),
      };

      expect(innerWidth(window)).equals(window.innerWidth);
    });
  });

  describe('func(addEventListener)', () => {
    it('should invoke addEventListener', () => {
      const type = 'click';
      const listener = sinon.stub();
      const options = {
        passive: true,
      };
      const window = {
        addEventListener: sinon.stub(),
      };

      addEventListener(type, listener, options, window);

      sinon.assert.calledOnce(window.addEventListener);
      sinon.assert.calledWithExactly(window.addEventListener, type, listener, options);
    });
  });

  describe('func(removeEventListener)', () => {
    it('should invoke removeEventListener', () => {
      const type = 'click';
      const listener = sinon.stub();
      const window = {
        removeEventListener: sinon.stub(),
      };

      removeEventListener(type, listener, window);

      sinon.assert.calledOnce(window.removeEventListener);
      sinon.assert.calledWithExactly(window.removeEventListener, type, listener);
    });
  });
});
