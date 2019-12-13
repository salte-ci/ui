import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Card } from '../index';
import { GetTheme } from '../../../utils/theme';

describe('<Card />', () => {
  it('should render the component', () => {
    const component = mount(<Card />);

    expect(component.children().length).equals(1);
  });

  it('should set defaults', () => {
    const component = mount(<Card />);

    expect(component.props()).equals({
      embed: false,
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

      expect(component.find('#card').prop('style').borderTopColor).equals(GetTheme('primary'));
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
      expect(component.find('Line#divider').prop('color')).equals(GetTheme('primary'));
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
});
