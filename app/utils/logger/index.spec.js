import { expect } from '@hapi/code';
import { RootLogger } from './index';

describe('Utils(Logger)', () => {
  it('should create a logger', () => {
    expect(RootLogger).not.equals(undefined);
  });
});
