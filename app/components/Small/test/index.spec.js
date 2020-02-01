import sinon from 'sinon';
import { expect } from '@hapi/code';

import { Small } from '..';
import { MockUntestables, chance } from '../../../utils/test/mock';
import { GetVariable } from '../../../utils/theme';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Small />', () => {
  const Fixture = FixtureFactory({
    component: Small,
  });

  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set defaults', () => {
    const component = Fixture();

    expect(component.props()).equals({
      theme: 'darken',
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

  describe('prop(align)', () => {
    it('should be a short-hand for the textAlign style', () => {
      const component = Fixture({
        props: {
          align: 'center',
        },
      });

      expect(component.find('#small').prop('style').textAlign).equals('center');
    });
  });

  describe('prop(style)', () => {
    it('should support providing custom styles', () => {
      const component = Fixture({
        props: {
          style: { height: 100 },
        },
      });

      expect(component.find('#small').prop('style').height).equals(100);
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a custom theme', () => {
      const component = Fixture({
        props: {
          theme: 'primary',
        },
      });

      const { '--sci-small-color': SmallColor } = component
        .find('#small')
        .prop('style');

      expect(SmallColor).equals(GetVariable('primary'));
    });
  });
});
