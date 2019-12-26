import { expect } from '@hapi/code';

import { MergeDeep } from '../index';

describe('MergeUtils', () => {
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
  });
});
