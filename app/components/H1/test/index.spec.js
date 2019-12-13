import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { H1 } from '../index';

describe('<H1 />', () => {
  it('should support providing extra props', () => {
    const component = mount(<H1 hello="world">Hello World</H1>);

    expect(component.find('h1').prop('hello')).equals('world');
  });

  describe('prop(className)', () => {
    it('should support providing a className', () => {
      const component = mount(<H1 className="test">Hello World</H1>);

      expect(component.find('h1').prop('className')).match(/test/);
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<H1>Hello World</H1>);

      expect(component.text()).equals('Hello World');
    });
  });
});
