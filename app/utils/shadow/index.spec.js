import { expect } from '@hapi/code';

import { BoxShadows, BoxShadow } from './index';

describe('ShadowUtils', () => {
  describe('function(BoxShadow)', () => {
    it('should support providing only a theme', () => {
      expect(BoxShadow('primary')).equals('0px 2px 0px 0px #1B1D23');
    });

    it('should support providing only a color', () => {
      expect(BoxShadow('#FFF')).equals('0px 2px 0px 0px #FFF');
    });

    it('should support providing a theme via properties', () => {
      const shadow = BoxShadow({
        theme: 'primary',
      });

      expect(shadow).equals('0px 2px 0px 0px #1B1D23');
    });

    it('should support providing a color via properties', () => {
      const shadow = BoxShadow({
        color: '#FFF',
      });

      expect(shadow).equals('0px 2px 0px 0px #FFF');
    });

    it('should support overriding offsetX', () => {
      const shadow = BoxShadow({
        color: '#FFF',
        offsetX: 2,
      });

      expect(shadow).equals('2px 2px 0px 0px #FFF');
    });

    it('should support overriding offsetY', () => {
      const shadow = BoxShadow({
        color: '#FFF',
        offsetY: 10,
      });

      expect(shadow).equals('0px 10px 0px 0px #FFF');
    });

    it('should support overriding blurRadius', () => {
      const shadow = BoxShadow({
        color: '#FFF',
        blurRadius: 10,
      });

      expect(shadow).equals('0px 2px 10px 0px #FFF');
    });

    it('should support overriding spreadRadius', () => {
      const shadow = BoxShadow({
        color: '#FFF',
        spreadRadius: 10,
      });

      expect(shadow).equals('0px 2px 0px 10px #FFF');
    });

    it('should support being inset', () => {
      const shadow = BoxShadow({
        color: '#FFF',
        inset: true,
      });

      expect(shadow).equals('inset 0px 2px 0px 0px #FFF');
    });
  });

  describe('function(BoxShadows)', () => {
    it('should support a signle shadow', () => {
      const shadows = BoxShadows(['#FFF']);

      expect(shadows).equals('0px 2px 0px 0px #FFF');
    });

    it('should support multiple shadows', () => {
      const shadows = BoxShadows(['#FFF', '#000']);

      expect(shadows).equals('0px 2px 0px 0px #FFF, 0px 2px 0px 0px #000');
    });

    it('should support not passing undefined', () => {
      expect(BoxShadows(undefined)).equals('');
    });

    it('should support not passing null', () => {
      expect(BoxShadows(null)).equals('');
    });

    it('should support not passing an empty array', () => {
      expect(BoxShadows([])).equals('');
    });
  });
});
