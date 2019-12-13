import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { GetTheme } from '../../../utils/theme';

import { Line } from '../../Line';
import { Toggle } from '../index';

describe('<Toggle />', () => {
  describe('prop(checked)', () => {
    it('should support being checked', () => {
      const component = mount(<Toggle checked />);

      const activeColor = GetTheme('success');

      const { style, checked, 'aria-checked': ariaChecked } = component.find('[role="checkbox"]').props();
      expect(style.backgroundColor).equals(activeColor);
      expect(checked).equals(true);
      expect(ariaChecked).equals(true);
    });

    it('should support not being checked', () => {
      const component = mount(<Toggle />);

      const activeColor = GetTheme('accent');

      const { style, checked, 'aria-checked': ariaChecked } = component.find('[role="checkbox"]').props();
      expect(style.backgroundColor).equals(activeColor);
      expect(checked).equals(undefined);
      expect(ariaChecked).equals(false);

      const lines = component.find(Line);
      expect(lines.length).equals(3);

      lines.forEach(line => {
        expect(line.prop('color')).equals(activeColor);
      });
    });
  });

  describe('prop(onClick)', () => {
    it('should forward the "onClick" event', () => {
      const onClick = sinon.stub();

      const component = mount(<Toggle onClick={onClick} />);

      component.find('[role="checkbox"]').simulate('click');

      sinon.assert.calledOnce(onClick);
    });
  });
});
