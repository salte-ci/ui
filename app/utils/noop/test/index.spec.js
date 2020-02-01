import { noop } from '..';

describe('Utils(NoOp)', () => {
  describe('func(noop)', () => {
    it('should be invokable', () => {
      noop();
    });
  });
});
