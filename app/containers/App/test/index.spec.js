import React from 'react';
import sinon from 'sinon';
import { Chance } from 'chance';
import { expect } from '@hapi/code';
import { MountWrapper } from '../../../utils/test/mount';

import { App } from '../index';
import { auth } from '../../../auth';
import { MockUntestables, MockState } from '../../../utils/test/mock';
import { UPDATE_TOKEN } from '../constants';
import { DashboardPage } from '../../DashboardPage/Loadable';
import { HomePage } from '../../HomePage/Loadable';

const chance = Chance();

// TODO: Write tests
describe('<App />', () => {
  beforeEach(() => {
    MockUntestables();
    sinon.stub(auth, 'on');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = MountWrapper(<App />);

    expect(component.children().length).equals(1);
  });

  describe('state(auth.idTokens.auth0)', () => {
    it('should display the HomePage if the token is expired', () => {
      const component = MountWrapper(
        <App />,
        MockState({
          auth: {
            idTokens: {
              auth0: {
                expired: true,
              },
            },
          },
        }),
      );

      expect(component.exists(HomePage)).equals(true);
    });

    it('should display the DashboardPage if the token is not expired', () => {
      const component = MountWrapper(
        <App />,
        MockState({
          auth: {
            idTokens: {
              auth0: {
                expired: false,
              },
            },
          },
        }),
      );

      expect(component.exists(DashboardPage)).equals(true);
    });
  });

  describe('listeners', () => {
    it('should register listeners for login and logout on each provider', () => {
      sinon.assert.notCalled(auth.on);

      MountWrapper(<App />);

      sinon.assert.calledTwice(auth.on);
      sinon.assert.calledWith(auth.on, 'login');
      sinon.assert.calledWith(auth.on, 'logout');
    });

    it('should dispatch an event to update the token store when successful', () => {
      const auth0Token = chance.string();

      auth.on.restore();
      sinon
        .stub(auth, 'on')
        .withArgs('login', sinon.match.func)
        .callsFake((_, listener) => listener(null, { provider: 'auth0' }));

      sinon
        .stub(auth, 'provider')
        .withArgs('auth0')
        .returns({
          idToken: auth0Token,
        });

      const dispatch = sinon.stub();

      MountWrapper(<App />, undefined, dispatch);

      sinon.assert.calledWithExactly(dispatch, {
        type: UPDATE_TOKEN,
        tokens: {
          auth0: auth0Token,
        },
      });
    });

    it('should not dispatch an event to update the token store upon failure', () => {
      auth.on.restore();
      sinon
        .stub(auth, 'on')
        .withArgs('login', sinon.match.func)
        .callsFake((_, listener) => listener(new Error('Failed to login')));

      const dispatch = sinon.stub();

      MountWrapper(<App />, undefined, dispatch);

      sinon.assert.notCalled(dispatch);
    });
  });
});
