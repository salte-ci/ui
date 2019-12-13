import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { H2 } from '../index';

describe('<H2 />', () => {
  it('should support providing extra props', () => {
    const component = mount(<H2 hello="world">Hello World</H2>);

    expect(component.find('h2').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = mount(<H2 className="test">Hello World</H2>);

      expect(component.find('h2').prop('className')).match(/test/);
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<H2>Hello World</H2>);

      expect(component.text()).equals('Hello World');
    });
  });
});
