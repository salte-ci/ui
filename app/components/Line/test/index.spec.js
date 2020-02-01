import { expect } from '@hapi/code';

import { Line } from '..';
import { GetVariable } from '../../../utils/theme';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Line />', () => {
  const Fixture = FixtureFactory({
    component: Line,
  });

  it('should support providing extra props', () => {
    const component = Fixture({
      props: {
        hello: 'world',
      },
    });

    expect(component.find('#line').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = Fixture({
        props: {
          className: 'test',
        },
      });

      expect(component.find('#line').prop('className')).contains('test');
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a theme', () => {
      const component = Fixture({
        props: {
          theme: 'primary',
        },
      });

      const { '--sci-line-color': LineColor } = component
        .find('#line')
        .prop('style');

      expect(LineColor).equals(GetVariable('primary'));
    });
  });
});
