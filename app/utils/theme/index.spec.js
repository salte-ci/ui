import { expect } from '@hapi/code';

import { GetTheme, GetThemeAndComplementary } from './index';

describe('ThemeUtils', () => {
  describe('function(GetThemeAndComplementary)', () => {
    it('should support darker themes', () => {
      expect(GetThemeAndComplementary('primary')).equals(['#1B1D23', '#F5F6FA']);
    });

    it('should support lighter themes', () => {
      expect(GetThemeAndComplementary('secondary')).equals(['#F5F6FA', '#1B1D23']);
    });

    it('should throw an error for invalid themes', () => {
      expect(() => GetThemeAndComplementary('unknown')).to.throw(Error, 'Unknown Theme. (unknown)');
    });
  });

  describe('function(GetTheme)', () => {
    it('should return a themes color', () => {
      expect(GetTheme('primary')).equals('#1B1D23');
    });

    it('should support invalid themes', () => {
      expect(GetTheme('unknown')).equals(undefined);
    });
  });
});
