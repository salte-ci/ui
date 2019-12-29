import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import * as Icons from '../../../utils/icons';
import { GetVariable } from '../../../utils/theme';

import { Icon } from '../index';

describe('<Icon />', () => {
  beforeEach(() => {
    sinon.stub(Icons, 'GetIcon').callsFake(name => {
      if (['logo'].includes(name)) {
        return props => (
          <div {...props} id="child">
            {name}
          </div>
        );
      }

      return null;
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('prop(name)', () => {
    it('should support rendering an icon', () => {
      const component = mount(<Icon name="logo" />);

      expect(component.text()).equals('logo');
    });

    it('should not render when the icon name is unknown', () => {
      const component = mount(<Icon name="bitbucket" />);

      expect(component.children().length).equals(0);
    });
  });

  describe('prop(className)', () => {
    it('should allow passing a className', () => {
      const component = mount(<Icon name="logo" className="test" />);

      expect(component.find('#child').prop('className')).contains('test');
    });
  });

  describe('prop(theme)', () => {
    it('should allow passing a theme', () => {
      const component = mount(<Icon name="logo" theme="primary" />);

      const { '--sci-icon-color': IconColor } = component.find('#child').prop('style');

      expect(IconColor).equals(GetVariable('primary'));
    });
  });

  describe('prop(large)', () => {
    it('should support a larger size', () => {
      const component = mount(<Icon name="logo" large />);

      expect(component.find('#child').prop('large')).equals('true');
    });
    it('should support being the normal size', () => {
      const component = mount(<Icon name="logo" />);

      expect(component.find('#child').prop('large')).equals('false');
    });
  });
});
