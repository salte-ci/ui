import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { mount } from 'enzyme';
import { List } from '../list';
import { MockUntestables } from '../../../utils/test/mock';

describe('<List />', () => {
  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = mount(<List />);

    expect(component.children().length).equals(1);
  });
});
