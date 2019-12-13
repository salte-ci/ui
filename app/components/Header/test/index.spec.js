import React from 'react';
import sinon from 'sinon';
import { Chance } from 'chance';
import { expect } from '@hapi/code';

import { Header } from '../index';
import { MountWrapper } from '../../../utils/test/mount';
import { MockIcons } from '../../../utils/test/mock';
import { auth } from '../../../auth';

const chance = Chance();

describe('<Header />', () => {
  const MockState = overrides => ({
    auth: {
      idTokens: {
        auth0: {
          expired: false,
          user: {
            name: chance.name(),
            picture: chance.url(),
          },
          ...overrides,
        },
      },
    },
  });

  beforeEach(() => {
    MockIcons();
    sinon.stub(auth, 'login');
    sinon.stub(auth, 'logout');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the component', () => {
    const component = MountWrapper(<Header />);

    expect(component.children().length).equals(1);
  });

  describe('state(idToken)', () => {
    it('should render Sign Up if the user is not logged in', () => {
      const component = MountWrapper(
        <Header />,
        MockState({
          expired: true,
        }),
      );

      expect(component.exists('#sign-up')).equals(true);
      expect(component.exists('#sign-out')).equals(false);
    });

    it('should render Sign Out if the user is logged in', () => {
      const state = MockState();
      const component = MountWrapper(<Header />, state);

      expect(component.exists('#sign-out')).equals(true);
      expect(component.exists('#sign-up')).equals(false);

      expect(component.find('Button#sign-out').text()).equals(state.auth.idTokens.auth0.user.name);
    });
  });

  describe('Sign Up', () => {
    it('should invoke "login" when clicked', () => {
      const component = MountWrapper(
        <Header />,
        MockState({
          expired: true,
        }),
      );

      sinon.assert.notCalled(auth.login);

      component.find('Button#sign-up').simulate('click');

      sinon.assert.calledOnce(auth.login);
    });
  });

  describe('Sign Out', () => {
    it('should invoke "logout" when clicked', () => {
      const component = MountWrapper(<Header />, MockState());

      sinon.assert.notCalled(auth.logout);

      component.find('Button#sign-out').simulate('click');

      sinon.assert.calledOnce(auth.logout);
    });
  });
});
