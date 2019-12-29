import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Button } from '../index';

import * as shadow from '../../../utils/shadow';
import { MockIcons } from '../../../utils/test/mock';
import { Icon } from '../../Icon';
import { GetThemeAndComplementary } from '../../../utils/theme';

describe('<Button />', () => {
  beforeEach(() => {
    sinon.stub(shadow, 'BoxShadows');
    MockIcons();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set defaults', () => {
    const component = mount(<Button />);

    expect(component.props()).equals({
      disabled: false,
      theme: 'primary',
      type: 'div',
      rounded: false,
      large: false,
    });
  });

  describe('prop(theme)', () => {
    it('should support multiple themes', () => {
      const component = mount(<Button theme="accent" />);

      expect(component.prop('theme')).equals('accent');
      sinon.assert.calledWith(shadow.BoxShadows, ['darken', '#EF5777']);
      expect(component.find('#content').prop('style').backgroundColor).equals('#EF5777');
    });
  });

  describe('prop(type)', () => {
    it('should support other Element types', () => {
      const component = mount(<Button type="a" />);

      expect(component.prop('type')).equals('a');

      const anchor = component.find('a');

      expect(anchor).not.equals(undefined);
      expect(anchor.parent().type()).equals(Button);
    });
  });

  describe('prop(rounded)', () => {
    it('should support the Button being rounded', () => {
      const component = mount(<Button rounded />);

      expect(component.prop('rounded')).equals(true);
    });
  });

  describe('prop(large)', () => {
    it('should support the Button being large', () => {
      const component = mount(<Button large />);

      expect(component.prop('large')).equals(true);
    });
  });

  describe('prop(icon)', () => {
    it('should support providing an icon', () => {
      const component = mount(<Button icon="bitbucket" />);

      expect(component.prop('icon')).equals('bitbucket');
      expect(component.find(Icon).prop('name')).equals('bitbucket');
    });
  });

  describe('prop(alignSelf)', () => {
    it('should be a short-hand for the alignSelf style property', () => {
      const component = mount(<Button alignSelf="center" />);

      expect(component.find('[role="button"]').prop('style').alignSelf).equals('center');
    });
  });

  describe('prop(disabled)', () => {
    it('should support being disabled', () => {
      const component = mount(<Button disabled />);

      const [themeColor, complementaryColor] = GetThemeAndComplementary('disabled');
      sinon.assert.calledWith(shadow.BoxShadows, ['darken', themeColor]);
      expect(component.find('#content').prop('style').color).equals(complementaryColor);
      expect(component.find('#content').prop('style').backgroundColor).equals(themeColor);
    });

    it('should ignore click events when disabled', () => {
      const onClick = sinon.stub();
      const component = mount(<Button disabled onClick={onClick} />);

      sinon.assert.notCalled(onClick);

      component.simulate('click');

      sinon.assert.notCalled(onClick);
    });
  });
});
