import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import * as Icons from '../../../utils/icons';
import { GetComplementary } from '../../../utils/theme';

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

  describe('prop(color)', () => {
    it('should allow passing a color', () => {
      const component = mount(<Icon name="logo" color="red" />);

      expect(component.find('#child').prop('style').fill).equals('red');
    });
  });

  describe('prop(theme)', () => {
    it('should allow passing a theme', () => {
      const component = mount(<Icon name="logo" theme="primary" />);

      expect(component.find('#child').prop('style').fill).equals(GetComplementary('primary'));
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
