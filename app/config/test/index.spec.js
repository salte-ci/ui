import { expect } from '@hapi/code';
import sinon from 'sinon';
import * as Window from '../../utils/window';

import * as Config from '..';
import { ALPHA, LIVE } from '../constants';

describe('Config', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('func(SetLocal)', () => {
    it('should update the key in localStorage', () => {
      sinon.stub(Window, 'reload');
      expect(localStorage.getItem(Config.LOCAL_KEY)).equals(null);

      Config.SetLocal(true);

      expect(localStorage.getItem(Config.LOCAL_KEY)).equals('true');
      sinon.assert.calledOnce(Window.reload);
    });
  });

  describe('func(IsLocal)', () => {
    it('should return true if all criteria pass', () => {
      localStorage.setItem(Config.LOCAL_KEY, true);

      expect(Config.IsLocal(ALPHA)).equals(true);
    });

    it('should return true if the environment is not alpha', () => {
      localStorage.setItem(Config.LOCAL_KEY, true);

      expect(Config.IsLocal(LIVE)).equals(false);
    });

    it('should return true if LOCAL_KEY is not true', () => {
      localStorage.setItem(Config.LOCAL_KEY, false);

      expect(Config.IsLocal(ALPHA)).equals(false);
    });
  });

  describe('func(GetEndpoints)', () => {
    it('should append localhost for the "alpha" environment', () => {
      const config = {
        url: 'https://api.alpha.salte.ci',
      };

      expect(Config.GetEndpoints(config, ALPHA)).equals([
        'https://api.alpha.salte.ci',
        'http://localhost:8080',
      ]);
    });

    it('should not append localhost for any other environment', () => {
      const config = {
        url: 'https://api.salte.ci',
      };

      expect(Config.GetEndpoints(config, LIVE)).equals([
        'https://api.salte.ci',
      ]);
    });
  });

  describe('func(UseLocal)', () => {
    it('should return localhost if local is true', () => {
      expect(Config.UseLocal(true)).equals('http://localhost:8080');
    });

    it('should return undefined if local is false', () => {
      expect(Config.UseLocal(false)).equals(undefined);
    });
  });
});
