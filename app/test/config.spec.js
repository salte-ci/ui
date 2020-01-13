import { expect } from '@hapi/code';
import sinon from 'sinon';
import * as WindowUtils from '../utils/window';

import * as Config from '../config';

describe('Config', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('func(UpdateLocal)', () => {
    it('should update the key in localStorage', () => {
      sinon.stub(WindowUtils, 'reload');
      expect(localStorage.getItem(Config.LOCAL_KEY)).equals(null);

      Config.UpdateLocal(true);

      expect(localStorage.getItem(Config.LOCAL_KEY)).equals('true');
      sinon.assert.calledOnce(WindowUtils.reload);
    });
  });

  describe('func(GetLocal)', () => {
    it('should return true if all criteria pass', () => {
      localStorage.setItem(Config.LOCAL_KEY, true);

      expect(Config.GetLocal('alpha')).equals(true);
    });

    it('should return true if the environment is not alpha', () => {
      localStorage.setItem(Config.LOCAL_KEY, true);

      expect(Config.GetLocal('live')).equals(false);
    });

    it('should return true if LOCAL_KEY is not true', () => {
      localStorage.setItem(Config.LOCAL_KEY, false);

      expect(Config.GetLocal('alpha')).equals(false);
    });
  });

  describe('func(GetEndpoints)', () => {
    it('should append localhost for the "alpha" environment', () => {
      expect(Config.GetEndpoints('alpha')).equals(['https://api.alpha.salte.ci', 'http://localhost:8080']);
    });

    it('should not append localhost for any other environment', () => {
      expect(Config.GetEndpoints('live')).equals(['https://api.alpha.salte.ci']);
    });
  });
});
