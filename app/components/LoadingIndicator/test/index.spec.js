import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { LoadingIndicator } from '../index';

describe('<LoadingIndicator />', () => {
  it('should set defaults', () => {
    const component = mount(<LoadingIndicator />);

    expect(component.props()).equals({
      loading: true,
    });
  });

  describe('prop(loading)', () => {
    it('should render if loading is true', () => {
      const component = mount(<LoadingIndicator loading />);

      expect(component.children().length).equals(1);
    });

    it('should not render if loading is false', () => {
      const component = mount(<LoadingIndicator loading={false} />);

      expect(component.children().length).equals(0);
    });
  });
});
