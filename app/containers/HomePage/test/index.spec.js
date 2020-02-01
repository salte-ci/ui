import { expect } from '@hapi/code';

import HomePage from '..';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<HomePage />', () => {
  const Fixture = FixtureFactory({
    component: HomePage,
  });

  it('should render', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });
});
