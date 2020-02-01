import sinon from 'sinon';
import { expect } from '@hapi/code';

import { ListItem } from '..';
import { MockUntestables, chance } from '../../../utils/test/mock';
import { Icon } from '../../Icon';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<ListItem />', () => {
  const Fixture = FixtureFactory({
    component: ListItem,
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
      icon: 'bullet',
      theme: 'accent',
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

      expect(component.text()).contains(children);
    });
  });

  describe('prop(icon)', () => {
    it('should support providing an icon', () => {
      const component = Fixture({
        props: {
          icon: 'infinite',
        },
      });

      expect(component.find(Icon).prop('name')).equals('infinite');
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a theme', () => {
      const component = Fixture({
        props: {
          theme: 'secondary',
        },
      });

      expect(component.find(Icon).prop('theme')).equals('secondary');
    });
  });
});
