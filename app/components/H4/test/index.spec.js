import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { H4 } from '../index';

describe('<H4 />', () => {
  it('should support providing extra props', () => {
    const component = mount(<H4 hello="world">Hello World</H4>);

    expect(component.find('h4').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = mount(<H4 className="test">Hello World</H4>);

      expect(component.find('h4').prop('className')).match(/test/);
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<H4>Hello World</H4>);

      expect(component.text()).equals('Hello World');
    });
  });
});
