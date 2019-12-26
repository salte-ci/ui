import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { Header } from '../index';
import { MountWrapper } from '../../../utils/test/mount';
import { MergeDeep } from '../../../utils/merge';
import { chance, MockIcons } from '../../../utils/test/mock';
import { auth } from '../../../auth';

describe('<Header />', () => {
  const RenderComponent = overrides => {
    const props = {
      idToken: {
        expired: true,
        user: {
          name: chance.name(),
          picture: chance.url(),
        },
      },
    };

    return MountWrapper(<Header {...MergeDeep(props, overrides)} />);
  };

  beforeEach(() => {
    MockIcons();
    sinon.stub(auth, 'login');
    sinon.stub(auth, 'logout');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the component', () => {
    const component = RenderComponent();

    expect(component.children().length).equals(1);
  });

  describe('state(idToken)', () => {
    it('should render Sign Up if the user is not logged in', () => {
      const component = RenderComponent({
        idToken: {
          expired: true,
        },
      });

      expect(component.exists('#sign-up')).equals(true);
      expect(component.exists('#sign-out')).equals(false);
    });

    it('should render Sign Out if the user is logged in', () => {
      const component = RenderComponent({
        idToken: {
          expired: false,
        },
      });

      expect(component.exists('#sign-out')).equals(true);
      expect(component.exists('#sign-up')).equals(false);

      expect(component.find('Button#sign-out').text()).equals(component.prop('idToken').user.name);
    });
  });

  describe('Sign Up', () => {
    it('should invoke "login" when clicked', () => {
      const component = RenderComponent({
        idToken: {
          expired: true,
        },
      });

      sinon.assert.notCalled(auth.login);

      component.find('Button#sign-up').simulate('click');

      sinon.assert.calledOnce(auth.login);
    });
  });

  describe('Sign Out', () => {
    it('should invoke "logout" when clicked', () => {
      const component = RenderComponent({
        idToken: {
          expired: false,
        },
      });

      sinon.assert.notCalled(auth.logout);

      component.find('Button#sign-out').simulate('click');

      sinon.assert.calledOnce(auth.logout);
    });
  });
});
