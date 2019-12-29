import React from 'react';
import Syntax from 'react-highlight';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import { Highlight } from '../index';

describe('<Highlight />', () => {
  it('should support rendering children', () => {
    const code = `const hello = 'world';`;
    const component = mount(<Highlight language="js">{code}</Highlight>);

    expect(component.find(Syntax).text()).equals(code);
  });

  it('should syntax highlight the children', () => {
    const code = `const hello = 'world';`;
    const component = mount(<Highlight language="js">{code}</Highlight>);

    expect(component.find(Syntax).text()).equals(code);
  });
});
