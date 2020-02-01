import React from 'react';
import { expect } from '@hapi/code';
import sinon from 'sinon';

import { Button } from '..';

import { MockIcons, chance } from '../../../utils/test/mock';
import { Icon } from '../../Icon';
import { GetVariable } from '../../../utils/theme';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<Button />', () => {
  const Fixture = FixtureFactory({
    component: Button,
  });

  beforeEach(() => {
    MockIcons();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set defaults', () => {
    const component = Fixture();

    expect(component.props()).equals({
      disabled: false,
      theme: 'primary',
      type: 'div',
      rounded: false,
      large: false,
      loading: false,
    });
  });

  describe('prop(children)', () => {
    it('should support providing children elements', () => {
      const content = chance.string();
      const component = Fixture({
        props: {
          children: <div>{content}</div>,
        },
      });

      expect(component.text()).equals(content);
      expect(component.exists('[test-id="wrapper"]')).equals(false);
    });

    it('should automatically wrap text nodes', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).equals(children);
      expect(component.exists('[test-id="wrapper"]')).equals(true);
    });
  });

  describe('prop(theme)', () => {
    it('should support other themes', () => {
      const component = Fixture({
        props: {
          theme: 'accent',
        },
      });

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
      const component = Fixture({
        props: {
          type: 'a',
        },
      });

      expect(component.prop('type')).equals('a');

      const anchor = component.find('a');

      expect(anchor).not.equals(undefined);
      expect(anchor.parent().type()).equals(Button);
    });
  });

  describe('prop(rounded)', () => {
    it('should support the Button being rounded', () => {
      const component = Fixture({
        props: {
          rounded: true,
        },
      });

      expect(component.prop('rounded')).equals(true);
    });

    it('should support the Button not being rounded', () => {
      const component = Fixture({
        props: {
          rounded: false,
        },
      });

      expect(component.prop('rounded')).equals(false);
    });
  });

  describe('prop(large)', () => {
    it('should support the Button being large', () => {
      const component = Fixture({
        props: {
          large: true,
        },
      });

      expect(component.prop('large')).equals(true);
    });

    it('should support the Button not being large', () => {
      const component = Fixture({
        props: {
          large: false,
        },
      });

      expect(component.prop('large')).equals(false);
    });
  });

  describe('prop(icon)', () => {
    it('should support providing an icon', () => {
      const component = Fixture({
        props: {
          icon: 'bitbucket',
        },
      });

      expect(component.prop('icon')).equals('bitbucket');
      expect(component.find(Icon).prop('name')).equals('bitbucket');
    });
  });

  describe('prop(alignSelf)', () => {
    it('should be a short-hand for the alignSelf style property', () => {
      const component = Fixture({
        props: {
          alignSelf: 'center',
        },
      });

      expect(component.find('[role="button"]').prop('style').alignSelf).equals(
        'center',
      );
    });
  });

  describe('prop(disabled)', () => {
    it('should support being disabled', () => {
      const component = Fixture({
        props: {
          disabled: true,
        },
      });

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
      const component = Fixture({
        props: {
          disabled: true,
          onClick,
        },
      });

      sinon.assert.notCalled(onClick);

      component.simulate('click');

      sinon.assert.notCalled(onClick);
    });
  });
});
