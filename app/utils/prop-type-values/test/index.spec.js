import { expect } from '@hapi/code';

import {
  TEXT_ALIGN,
  ALIGN_ITEMS,
  ALIGN_SELF,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
  LANGUAGES,
} from '../index';

describe('PropTypeValues', () => {
  describe('constant(TEXT_ALIGN)', () => {
    it('should be defined with the given values', () => {
      expect(TEXT_ALIGN).equals(['left', 'center', 'right']);
    });
  });

  describe('constant(ALIGN_ITEMS)', () => {
    it('should be defined with the given values', () => {
      expect(ALIGN_ITEMS).equals(['start', 'center', 'flex-end']);
    });
  });

  describe('constant(ALIGN_SELF)', () => {
    it('should be defined with the given values', () => {
      expect(ALIGN_SELF).equals(ALIGN_ITEMS);
    });
  });

  describe('constant(FLEX_DIRECTION)', () => {
    it('should be defined with the given values', () => {
      expect(FLEX_DIRECTION).equals(['row', 'column']);
    });
  });

  describe('constant(JUSTIFY_CONTENT)', () => {
    it('should be defined with the given values', () => {
      expect(JUSTIFY_CONTENT).equals([
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
        'space-evenly',
      ]);
    });
  });

  describe('constant(LANGUAGES)', () => {
    it('should be defined with the given values', () => {
      expect(LANGUAGES).equals(['js', 'yaml']);
    });
  });
});
