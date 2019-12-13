import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Line } from '../index';
import { GetTheme } from '../../../utils/theme';

describe('<Line />', () => {
  it('should support providing extra props', () => {
    const component = mount(<Line hello="world" />);

    expect(component.find('#line').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = mount(<Line className="test" />);

      expect(component.find('#line').prop('className')).match(/test/);
    });
  });

  describe('prop(color)', () => {
    it('should support providing a color', () => {
      const component = mount(<Line color="red" />);

      expect(component.find('#line').prop('style').backgroundColor).equals('red');
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a theme', () => {
      const component = mount(<Line theme="primary" />);

      expect(component.find('#line').prop('style').backgroundColor).equals(GetTheme('primary'));
    });
  });
});
