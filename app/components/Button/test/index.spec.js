import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Button } from '../index';

import { MockIcons } from '../../../utils/test/mock';
import { Icon } from '../../Icon';
import { GetVariable } from '../../../utils/theme';

describe('<Button />', () => {
  beforeEach(() => {
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

  describe('prop(children)', () => {
    it('should support providing children elements', () => {
      const component = mount(
        <Button>
          <div>Hello World</div>
        </Button>,
      );

      expect(component.text()).equals('Hello World');
      expect(component.exists('[test-id="wrapper"]')).equals(false);
    });

    it('should automatically wrap text nodes', () => {
      const component = mount(<Button>Hello World</Button>);

      expect(component.text()).equals('Hello World');
      expect(component.exists('[test-id="wrapper"]')).equals(true);
    });
  });

  describe('prop(theme)', () => {
    it('should support other themes', () => {
      const component = mount(<Button theme="accent" />);

      expect(component.prop('theme')).equals('accent');

      const {
        '--sci-button-color': ButtonColor,
        '--sci-button-background-color': ButtonBackgroundColor,
      } = component.find('[role="button"]').prop('style');

      expect(ButtonColor).equals(GetVariable('secondary'));
      expect(ButtonBackgroundColor).equals(GetVariable('accent'));
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

      expect(component.find('[role="button"]').prop('style').alignSelf).equals(
        'center',
      );
    });
  });

  describe('prop(disabled)', () => {
    it('should support being disabled', () => {
      const component = mount(<Button disabled />);

      expect(component.find('[role="button"]').prop('disabled')).equals(true);

      const {
        '--sci-button-color': ButtonColor,
        '--sci-button-background-color': ButtonBackgroundColor,
      } = component.find('[role="button"]').prop('style');

      expect(ButtonColor).equals(GetVariable('secondary'));
      expect(ButtonBackgroundColor).equals(GetVariable('disabled'));
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
