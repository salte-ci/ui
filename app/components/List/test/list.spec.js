import sinon from 'sinon';
import { expect } from '@hapi/code';

import { List } from '..';
import { MockUntestables } from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<List />', () => {
  const Fixture = FixtureFactory({
    component: List,
  });

  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });
});
