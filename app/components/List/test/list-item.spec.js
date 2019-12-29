import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { mount } from 'enzyme';
import { ListItem } from '../list-item';
import { MockUntestables } from '../../../utils/test/mock';
import { Icon } from '../../Icon';

describe('<ListItem />', () => {
  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = mount(<ListItem />);

    expect(component.children().length).equals(1);
  });

  it('should set defaults', () => {
    const component = mount(<ListItem />);

    expect(component.props()).equals({
      icon: 'bullet',
      theme: 'accent',
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const component = mount(<ListItem>Hello World</ListItem>);

      expect(component.text()).contains('Hello World');
    });
  });

  describe('prop(icon)', () => {
    it('should support providing children', () => {
      const component = mount(<ListItem icon="infinite" />);

      expect(component.find(Icon).prop('name')).equals('infinite');
    });
  });

  describe('prop(theme)', () => {
    it('should support providing children', () => {
      const component = mount(<ListItem theme="secondary" />);

      expect(component.find(Icon).prop('theme')).equals('secondary');
    });
  });
});
