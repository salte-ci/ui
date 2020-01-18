import { expect } from '@hapi/code';

import { MergeDeep } from '../index';

describe('Utils(Merge)', () => {
  describe('func(MergeDeep)', () => {
    it('should support merging', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
      };
      const source = {
        hallo: 'world',
      };

      const result = MergeDeep(target, source);

      expect(result).equals({
        hello: 'world',
        hallo: 'world',
      });
    });

    it('should support merging nested objects', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
        example: {
          hello: 'world',
          hallo: 'welt',
        },
      };

      const source = {
        hallo: 'world',
        example: {
          hallo: 'world',
        },
      };

      const result = MergeDeep(target, source);

      expect(result).equals({
        hello: 'world',
        hallo: 'world',
        example: {
          hello: 'world',
          hallo: 'world',
        },
      });
    });

    it('should support merging arrays', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
        example: [],
      };

      const source = {
        hallo: 'world',
      };

      const result = MergeDeep(target, source);

      expect(result).equals({
        hello: 'world',
        hallo: 'world',
        example: [],
      });
    });

    it('should support no sources being provided', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
        example: {
          hello: 'world',
          hallo: 'welt',
        },
      };

      expect(MergeDeep(target)).equals(target);
    });

    it('should support undefined sources being provided', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
        example: {
          hello: 'world',
          hallo: 'welt',
        },
      };

      expect(MergeDeep(target, undefined)).equals(target);
    });

    it('should support null values', () => {
      const target = {
        hello: 'world',
        hallo: 'welt',
      };

      const source = {
        hallo: null,
      };

      const result = MergeDeep(target, source);

      expect(result).equals({
        hello: 'world',
        hallo: null,
      });
    });

    it('should support exclude undefined values', () => {
      const target = {
        hello: 'world',
        guten: undefined,
      };

      const source = {
        hallo: undefined,
      };

      const result = MergeDeep(target, source);

      expect(result).equals({
        hello: 'world',
      });
    });
  });
});
