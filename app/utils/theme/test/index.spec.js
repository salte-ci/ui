import { expect } from '@hapi/code';

import { GetVariable, GetComplementary } from '..';
import { chance } from '../../test/mock';

describe('Utils(Theme)', () => {
  describe('function(GetVariable)', () => {
    it('should create a css variable', () => {
      expect(GetVariable('primary')).equals('var(--sci-primary-color)');
    });
  });

  describe('function(GetComplementary)', () => {
    it('should return "secondary" for "primary"', () => {
      expect(GetComplementary('primary')).equals('secondary');
    });

    it('should return "secondary" for "accent"', () => {
      expect(GetComplementary('accent')).equals('secondary');
    });

    it('should return "secondary" for "success"', () => {
      expect(GetComplementary('success')).equals('secondary');
    });

    it('should return "secondary" for "warning"', () => {
      expect(GetComplementary('warning')).equals('secondary');
    });

    it('should return "secondary" for "danger"', () => {
      expect(GetComplementary('danger')).equals('secondary');
    });

    it('should return "secondary" for "github"', () => {
      expect(GetComplementary('github')).equals('secondary');
    });

    it('should return "secondary" for "bitbucket"', () => {
      expect(GetComplementary('bitbucket')).equals('secondary');
    });

    it('should return "secondary" for "gitlab"', () => {
      expect(GetComplementary('gitlab')).equals('secondary');
    });

    it('should return "secondary" for "disabled"', () => {
      expect(GetComplementary('disabled')).equals('secondary');
    });

    it('should return "secondary" for "secondary"', () => {
      expect(GetComplementary('secondary')).equals('primary');
    });

    it('should return "secondary" for "white"', () => {
      expect(GetComplementary('white')).equals('primary');
    });

    it('should throw an error for unknown themes', () => {
      const theme = chance.string();

      expect(() => GetComplementary(theme)).throws(`Unknown Theme. (${theme})`);
    });
  });
});
