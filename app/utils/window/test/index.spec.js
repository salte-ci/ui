import { expect } from '@hapi/code';

import { origin } from '../index';
import { chance } from '../../test/mock';

describe('WindowUtils', () => {
  describe('func(origin)', () => {
    it('should return the origin', () => {
      const location = {
        origin: chance.url(),
      };

      expect(origin(location)).equals(location.origin);
    });
  });
});
