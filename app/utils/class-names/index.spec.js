import { expect } from '@hapi/code';

import { ConcatClassNames } from './index';

describe('ClassNamesUtils', () => {
  describe('function(ConcatClassNames)', () => {
    it('should support a single class', () => {
      expect(ConcatClassNames('my-class')).equals('my-class');
    });

    it('should support a multiple classes', () => {
      expect(ConcatClassNames('my-class', 'other-class')).equals(
        'my-class other-class',
      );
    });

    it('should ignore undefined values', () => {
      expect(ConcatClassNames('my-class', undefined, 'other-class')).equals(
        'my-class other-class',
      );
    });

    it('should ignore null values', () => {
      expect(ConcatClassNames('my-class', null, 'other-class')).equals(
        'my-class other-class',
      );
    });

    it('should ignore false values', () => {
      expect(ConcatClassNames('my-class', false, 'other-class')).equals(
        'my-class other-class',
      );
    });
  });
});
