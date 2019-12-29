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
    it('should set the loading attribute to true', () => {
      const component = mount(<LoadingIndicator loading />);

      expect(component.find('#loading').prop('loading')).equals('true');
    });

    it('should set the loading attribute to false', () => {
      const component = mount(<LoadingIndicator loading={false} />);

      expect(component.find('#loading').prop('loading')).equals('false');
    });
  });
});
