import { expect } from '@hapi/code';
import sinon from 'sinon';

import * as Window from '..';
import { chance } from '../../test/mock';

describe('Utils(Window)', () => {
  describe('func(origin)', () => {
    it('should return the origin', () => {
      const location = {
        origin: chance.url(),
      };

      expect(Window.origin(location)).equals(location.origin);
    });
  });

  describe('func(search)', () => {
    it('should return the search', () => {
      const location = {
        search: chance.url(),
      };

      expect(Window.search(location)).equals(location.search);
    });
  });

  describe('func(reload)', () => {
    it('should reload the page', () => {
      const location = {
        reload: sinon.stub(),
      };

      Window.reload(location);

      sinon.assert.calledOnce(location.reload);
    });
  });

  describe('func(innerWidth)', () => {
    it('should return the innerWidth', () => {
      const window = {
        innerWidth: chance.integer(),
      };

      expect(Window.innerWidth(window)).equals(window.innerWidth);
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

      Window.addEventListener(type, listener, options, window);

      sinon.assert.calledOnce(window.addEventListener);
      sinon.assert.calledWithExactly(
        window.addEventListener,
        type,
        listener,
        options,
      );
    });
  });

  describe('func(removeEventListener)', () => {
    it('should invoke removeEventListener', () => {
      const type = 'click';
      const listener = sinon.stub();
      const window = {
        removeEventListener: sinon.stub(),
      };

      Window.removeEventListener(type, listener, window);

      sinon.assert.calledOnce(window.removeEventListener);
      sinon.assert.calledWithExactly(
        window.removeEventListener,
        type,
        listener,
      );
    });
  });

  describe('func(setTimeout)', () => {
    it('should invoke setTimeout', () => {
      const expectedHandle = chance.integer();
      const handler = sinon.stub();
      const timeout = chance.integer();
      const window = {
        setTimeout: sinon.stub().returns(expectedHandle),
      };

      const handle = Window.setTimeout(handler, timeout, window);

      expect(handle).equals(expectedHandle);
      sinon.assert.calledOnce(window.setTimeout);
      sinon.assert.calledWithExactly(window.setTimeout, handler, timeout);
    });
  });

  describe('func(clearTimeout)', () => {
    it('should invoke clearTimeout', () => {
      const expectedHandle = chance.integer();
      const handle = chance.integer();
      const window = {
        clearTimeout: sinon.stub().returns(expectedHandle),
      };

      Window.clearTimeout(handle, window);

      sinon.assert.calledOnce(window.clearTimeout);
      sinon.assert.calledWithExactly(window.clearTimeout, handle);
    });
  });

  describe('func(requestAnimationFrame)', () => {
    it('should invoke requestAnimationFrame', () => {
      const expectedHandle = chance.integer();
      const callback = sinon.stub();
      const window = {
        requestAnimationFrame: sinon.stub().returns(expectedHandle),
      };

      Window.requestAnimationFrame(callback, window);

      sinon.assert.calledOnce(window.requestAnimationFrame);
      sinon.assert.calledWithExactly(window.requestAnimationFrame, callback);
    });
  });

  describe('func(fetch)', () => {
    it('should invoke fetch', async () => {
      const url = chance.url();
      const options = { method: 'post' };
      const expectedResponse = chance.string();
      const window = {
        fetch: sinon.stub().resolves(expectedResponse),
      };

      const response = await Window.fetch(url, options, window);

      expect(response).equals(expectedResponse);
      sinon.assert.calledOnce(window.fetch);
      sinon.assert.calledWithExactly(window.fetch, url, options);
    });
  });
});
