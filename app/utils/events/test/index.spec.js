import { expect } from '@hapi/code';
import sinon from 'sinon';

import { chance } from '../../test/mock';

import * as Events from '..';

describe('Utils(Events)', () => {
  describe('func(currentTargetPredicate)', () => {
    it('should return true if the currentTarget matches the target', () => {
      const result = Events.currentTargetPredicate({
        target: 4,
        currentTarget: 4,
      });

      expect(result).equals(true);
    });

    it('should return false if the currentTarget does not match the target', () => {
      const result = Events.currentTargetPredicate({
        target: 4,
        currentTarget: 5,
      });

      expect(result).equals(false);
    });
  });

  describe('func(once)', () => {
    it('should register an event listener that is only invoked once', async () => {
      const expectedEvent = chance.string();
      const expectedType = chance.string();
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

      const promise = Events.once(target, expectedType, options);

      expect(listeners.length).equals(1);

      listeners.forEach((listener) => listener(expectedEvent));

      const actualEvent = await promise;

      expect(listeners.length).equals(0);

      expect(actualEvent).equals(expectedEvent);
      sinon.assert.calledOnce(target.removeEventListener);
    });

    it('should support avoid resolving for failed predicates', async () => {
      const target = {
        addEventListener: sinon.stub().callsFake((type, listener) => {
          listener({
            target: 1,
            currentTarget: 4,
          });
        }),
        removeEventListener: sinon.stub(),
      };

      Events.once(target, 'click', null, Events.currentTargetPredicate);

      sinon.assert.calledOnce(target.addEventListener);
      sinon.assert.notCalled(target.removeEventListener);
    });
  });
});
