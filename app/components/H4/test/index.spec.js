import { expect } from '@hapi/code';

import { H4 } from '..';
import { chance } from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<H4 />', () => {
  const Fixture = FixtureFactory({
    component: H4,
    props: () => ({
      children: chance.string(),
    }),
  });

  it('should support providing extra props', () => {
    const component = Fixture({
      props: {
        hello: 'world',
      },
    });

    expect(component.find('h4').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = Fixture({
        props: {
          className: 'test',
        },
      });

      expect(component.find('h4').prop('className')).match(/test/);
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
    });
  });
});
