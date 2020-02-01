import { expect } from '@hapi/code';
import { Terminal } from '..';
import { chance } from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Terminal />', () => {
  const Fixture = FixtureFactory({
    component: Terminal,
  });

  it('should render', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.find('#content').text()).equals(children);
    });
  });
});
