import { expect } from '@hapi/code';
import sinon from 'sinon';
import * as MediaQueryUtils from '../index';
import { chance } from '../../test/mock';

describe('MediaQueryUtils', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('function(query)', () => {
    it('should return a "MediaQueryList"', () => {
      expect(MediaQueryUtils.query(chance.string())).exists();
    });
  });

  describe('function(on)', () => {
    it('should add a media listener', () => {
      const addEventListener = sinon.stub();
      const listener = sinon.stub();

      sinon.stub(window, 'matchMedia').returns({ addEventListener });
      MediaQueryUtils.on(chance.string(), listener);

      sinon.assert.calledOnce(addEventListener);
      sinon.assert.calledWithExactly(addEventListener, 'change', listener, {
        passive: true,
      });
    });
  });

  describe('function(off)', () => {
    it('should remove a media listener', () => {
      const removeEventListener = sinon.stub();
      const listener = sinon.stub();

      sinon.stub(window, 'matchMedia').returns({ removeEventListener });
      MediaQueryUtils.off(chance.string(), listener);

      sinon.assert.calledOnce(removeEventListener);
      sinon.assert.calledWithExactly(removeEventListener, 'change', listener);
    });
  });

  describe('function(matches)', () => {
    it('should return true if the media matches', () => {
      sinon.stub(window, 'matchMedia').returns({ matches: true });

      expect(MediaQueryUtils.matches(chance.string())).equals(true);
    });

    it('should return false if the media does not matches', () => {
      sinon.stub(window, 'matchMedia').returns({ matches: false });

      expect(MediaQueryUtils.matches(chance.string())).equals(false);
    });
  });
});
