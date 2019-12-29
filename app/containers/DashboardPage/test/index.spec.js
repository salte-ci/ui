import React from 'react';
import { expect } from '@hapi/code';

import { MountWrapper } from '../../../utils/test/mount';

import DashboardPage from '../index';

describe('<DashboardPage />', () => {
  it('should render', () => {
    const component = MountWrapper(<DashboardPage />);

    expect(component.children().length).equals(1);
  });
});
