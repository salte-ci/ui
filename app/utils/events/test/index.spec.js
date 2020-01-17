import { expect } from '@hapi/code';
import sinon from 'sinon';

import { chance } from '../../test/mock';

import { once } from '../index';

describe('EventUtils', () => {
  describe('func(once)', () => {
    it('should register an event listener that is only invoked once', () => {
      const expectedType = chance.string();
      const callback = sinon.stub();
      const options = {
        passive: true,
      };

      const listeners = [];
      const target = {
        addEventListener: sinon.stub().callsFake((type, listener) => {
          expect(type).equals(expectedType);

          listeners.push(listener);
        }),
        removeEventListener: sinon.stub().callsFake((type, listener) => {
          expect(type).equals(expectedType);

          const index = listeners.indexOf(listener);

          if (index === -1) return;

          listeners.splice(index, 1);
        }),
      };

      once(target, expectedType, callback, options);

      expect(listeners.length).equals(1);

      listeners.forEach(listener => listener());

      expect(listeners.length).equals(0);

      sinon.assert.calledOnce(callback);
      sinon.assert.calledOnce(target.removeEventListener);
    });
  });
});
