import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import { Terminal } from '../index';

describe('<Terminal />', () => {
  it('should render', () => {
    const component = mount(<Terminal />);

    expect(component.children().length).equals(1);
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<Terminal>Hello World</Terminal>);

      expect(component.find('#content').text()).equals('Hello World');
    });
  });
});
