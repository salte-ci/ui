import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Accordion } from '../index';

describe('<Accordion />', () => {
  describe('prop(opened)', () => {
    it('should render if it is opened', () => {
      const component = mount(<Accordion opened />);

      expect(component.children().length).equals(1);
    });

    it('should not render if it is closed', () => {
      const component = mount(<Accordion />);

      expect(component.children().length).equals(0);
    });
  });
});
