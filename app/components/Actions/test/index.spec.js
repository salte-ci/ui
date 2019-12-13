import React from 'react';
import { expect } from '@hapi/code';
import { MountWrapper } from '../../../utils/test/mount';

import { Actions } from '../index';

describe('<Actions />', () => {
  it('should render', () => {
    const component = MountWrapper(<Actions />);

    expect(component.children().length).equals(1);
  });
});
