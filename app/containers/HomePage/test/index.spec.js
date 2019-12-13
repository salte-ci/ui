import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import HomePage from '../index';

describe('<HomePage />', () => {
  it('should render', () => {
    const component = mount(<HomePage />);

    expect(component.children().length).equals(1);
  });
});
