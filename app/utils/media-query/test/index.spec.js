import { expect } from '@hapi/code';
import sinon from 'sinon';
import * as MediaQuery from '../index';
import { chance } from '../../test/mock';

describe('Utils(MediaQuery)', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('function(query)', () => {
    it('should return a "MediaQueryList"', () => {
      expect(MediaQuery.query(chance.string())).exists();
    });
  });

  describe('function(on)', () => {
    it('should add a media listener', () => {
      const addEventListener = sinon.stub();
      const listener = sinon.stub();

      sinon.stub(window, 'matchMedia').returns({ addEventListener });
      MediaQuery.on(chance.string(), listener);

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
      MediaQuery.off(chance.string(), listener);

      sinon.assert.calledOnce(removeEventListener);
      sinon.assert.calledWithExactly(removeEventListener, 'change', listener);
    });
  });

  describe('function(matches)', () => {
    it('should return true if the media matches', () => {
      sinon.stub(window, 'matchMedia').returns({ matches: true });

      expect(MediaQuery.matches(chance.string())).equals(true);
    });

    it('should return false if the media does not matches', () => {
      sinon.stub(window, 'matchMedia').returns({ matches: false });

      expect(MediaQuery.matches(chance.string())).equals(false);
    });
  });
});
