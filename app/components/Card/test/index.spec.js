import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Card } from '../index';
import { GetVariable } from '../../../utils/theme';
import { chance } from '../../../utils/test/mock';

describe('<Card />', () => {
  it('should render the component', () => {
    const component = mount(<Card />);

    expect(component.children().length).equals(1);
  });

  it('should set defaults', () => {
    const component = mount(<Card />);

    expect(component.props()).equals({
      direction: 'column',
      embed: false,
      loading: false,
      theme: 'accent',
    });
  });

  it('should support providing extra props', () => {
    const component = mount(<Card hello="world">Hello World</Card>);

    expect(component.find('#card').prop('hello')).equals('world');
  });

  describe('prop(children)', () => {
    it('should support providing content', () => {
      const component = mount(<Card>Hello World</Card>);

      expect(component.text()).equals('Hello World');
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a theme', () => {
      const component = mount(<Card theme="primary" />);

      const { '--sci-card-accent-color': CardAccentColor } = component
        .find('#card')
        .prop('style');

      expect(CardAccentColor).equals(GetVariable('primary'));
    });
  });

  describe('prop(header)', () => {
    it('should support providing a header', () => {
      const component = mount(<Card header="Header" />);

      expect(component.exists('H3#header')).equals(true);
      expect(component.find('H3#header').text()).equals('Header');
      expect(component.find('#card').prop('style').paddingTop).equals('10px');
    });

    it('should support theming the header divider', () => {
      const component = mount(<Card header="Header" theme="primary" />);

      expect(component.exists('Line#divider')).equals(true);
      expect(component.find('Line#divider').prop('theme')).equals('primary');
    });
  });

  describe('prop(embed)', () => {
    it('should support being embedded', () => {
      const component = mount(<Card embed />);

      expect(component.find('#card').prop('embed')).equals('true');
      expect(component.find('#card').prop('style').paddingTop).equals(null);
    });

    it('should support not being embedded', () => {
      const component = mount(<Card />);

      expect(component.find('#card').prop('embed')).equals('false');
      expect(component.find('#card').prop('style').paddingTop).equals('20px');
    });
  });

  describe('prop(direction)', () => {
    it('should support a direction of "row"', () => {
      const component = mount(<Card direction="row" />);

      expect(component.find('Grid[tid="layout"]').prop('direction')).equals(
        'row',
      );
    });
  });

  describe('prop(className)', () => {
    it('should support a custom className', () => {
      const className = chance.string();

      const component = mount(<Card className={className} />);

      expect(component.find('#card').prop('className')).contains(className);
    });
  });

  describe('prop(onClick)', () => {
    it('should support being clickable', () => {
      const onClick = sinon.stub();
      const component = mount(<Card onClick={onClick} />);

      expect(component.find('[role="button"]').prop('onClick')).equals(onClick);
    });

    it('should support not being clickable', () => {
      const component = mount(<Card />);

      expect(component.exists('[role="button"]')).equals(false);
    });
  });
});
