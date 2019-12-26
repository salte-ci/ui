import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import DashboardPage from '../index';

describe('<DashboardPage />', () => {
  it('should render', () => {
    const component = mount(<DashboardPage />);

    expect(component.children().length).equals(1);
  });
});
