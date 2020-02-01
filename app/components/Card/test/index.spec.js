import sinon from 'sinon';
import { expect } from '@hapi/code';

import { Card } from '..';
import { GetVariable } from '../../../utils/theme';
import { chance } from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Card />', () => {
  const Fixture = FixtureFactory({
    component: Card,
    props: () => ({
      children: chance.string(),
    }),
  });

  it('should render the component', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  it('should set defaults', () => {
    const component = Fixture();

    const { children, ...props } = component.props();

    expect(props).equals({
      direction: 'column',
      embed: false,
      loading: false,
      theme: 'accent',
    });
  });

  it('should support providing extra props', () => {
    const component = Fixture({
      props: {
        hello: 'world',
      },
    });

    expect(component.find('#card').prop('hello')).equals('world');
  });

  describe('prop(children)', () => {
    it('should support providing content', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a theme', () => {
      const component = Fixture({
        props: {
          theme: 'primary',
        },
      });

      const { '--sci-card-accent-color': CardAccentColor } = component
        .find('#card')
        .prop('style');

      expect(CardAccentColor).equals(GetVariable('primary'));
    });
  });

  describe('prop(header)', () => {
    it('should support providing a header', () => {
      const header = chance.string();
      const component = Fixture({
        props: {
          header,
        },
      });

      expect(component.exists('H3#header')).equals(true);
      expect(component.find('H3#header').text()).equals(header);
      expect(component.find('#card').prop('style').paddingTop).equals('10px');
    });

    it('should support theming the header divider', () => {
      const component = Fixture({
        props: {
          header: 'Header',
          theme: 'primary',
        },
      });

      expect(component.exists('Line#divider')).equals(true);
      expect(component.find('Line#divider').prop('theme')).equals('primary');
    });
  });

  describe('prop(embed)', () => {
    it('should support being embedded', () => {
      const component = Fixture({
        props: {
          embed: true,
        },
      });

      expect(component.find('#card').prop('embed')).equals('true');
      expect(component.find('#card').prop('style').paddingTop).equals(null);
    });

    it('should support not being embedded', () => {
      const component = Fixture({
        props: {
          embed: false,
        },
      });

      expect(component.find('#card').prop('embed')).equals('false');
      expect(component.find('#card').prop('style').paddingTop).equals('20px');
    });
  });

  describe('prop(direction)', () => {
    it('should support a direction of "row"', () => {
      const component = Fixture({
        props: {
          direction: 'row',
        },
      });

      expect(component.find('Grid[tid="layout"]').prop('direction')).equals(
        'row',
      );
    });
  });

  describe('prop(className)', () => {
    it('should support a custom className', () => {
      const className = chance.string();

      const component = Fixture({
        props: {
          className,
        },
      });

      expect(component.find('#card').prop('className')).contains(className);
    });
  });

  describe('prop(onClick)', () => {
    it('should support being clickable', () => {
      const onClick = sinon.stub();
      const component = Fixture({
        props: {
          onClick,
        },
      });

      expect(component.find('[role="button"]').prop('onClick')).equals(onClick);
    });

    it('should support not being clickable', () => {
      const component = Fixture({
        props: {
          onClick: undefined,
        },
      });

      expect(component.exists('[role="button"]')).equals(false);
    });
  });
});
