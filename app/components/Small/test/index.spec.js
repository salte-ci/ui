import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { mount } from 'enzyme';
import { Small } from '../index';
import { MockUntestables } from '../../../utils/test/mock';
import { GetVariable } from '../../../utils/theme';

describe('<Small />', () => {
  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = mount(<Small />);

    expect(component.children().length).equals(1);
  });

  it('should set defaults', () => {
    const component = mount(<Small />);

    expect(component.props()).equals({
      theme: 'darken',
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<Small>Hello World</Small>);

      expect(component.text()).equals('Hello World');
    });
  });

  describe('prop(align)', () => {
    it('should be a short-hand for the textAlign style', () => {
      const component = mount(<Small align="center" />);

      expect(component.find('#small').prop('style').textAlign).equals('center');
    });
  });

  describe('prop(style)', () => {
    it('should support providing custom styles', () => {
      const component = mount(<Small style={{ height: 100 }} />);

      expect(component.find('#small').prop('style').height).equals(100);
    });
  });

  describe('prop(theme)', () => {
    it('should support providing a custom theme', () => {
      const component = mount(<Small theme="primary" />);

      const { '--sci-small-color': SmallColor } = component.find('#small').prop('style');

      expect(SmallColor).equals(GetVariable('primary'));
    });
  });
});
