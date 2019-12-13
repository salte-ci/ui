import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { H3 } from '../index';

describe('<H3 />', () => {
  it('should support providing extra props', () => {
    const component = mount(<H3 hello="world">Hello World</H3>);

    expect(component.find('h3').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = mount(<H3 className="test">Hello World</H3>);

      expect(component.find('h3').prop('className')).match(/test/);
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<H3>Hello World</H3>);

      expect(component.text()).equals('Hello World');
    });
  });
});
