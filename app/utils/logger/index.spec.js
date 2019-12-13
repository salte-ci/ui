import { expect } from '@hapi/code';
import { RootLogger } from './index';

describe('LoggerUtils', () => {
  it('should create a logger', () => {
    expect(RootLogger).not.equals(undefined);
  });
});
