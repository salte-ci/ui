import { act } from 'react-dom/test-utils';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import * as Environments from '../../../config/environments';
import * as Config from '../../../config';

import { Header } from '..';
import { FixtureFactory } from '../../../utils/test/mount';
import { chance, MockUntestables } from '../../../utils/test/mock';
import { auth } from '../../../auth';
import { Toggle } from '../../Toggle';
import { AccountSettingsModal } from '../../AccountSettingsModal';
import { ALPHA, LIVE, LOCAL } from '../../../config/constants';

describe('<Header />', () => {
  const Fixture = FixtureFactory({
    component: Header,
    props: () => ({
      idToken: {
        expired: true,
        user: {
          name: chance.name(),
          picture: chance.url(),
        },
      },
    }),
    mountType: 'app',
  });

  beforeEach(() => {
    MockUntestables();

    sinon.stub(auth, 'login');
    sinon.stub(auth, 'logout');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the component', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  describe('config(environment)', () => {
    it('should render a toggle if the environment is "alpha"', () => {
      sinon.stub(Environments, 'environment').get(() => ALPHA);

      const component = Fixture();

      expect(component.exists(Toggle)).equals(true);
    });

    it('should render a toggle if the environment is "local"', () => {
      sinon.stub(Environments, 'environment').get(() => LOCAL);

      const component = Fixture();

      expect(component.exists(Toggle)).equals(true);
    });

    it('should call "SetLocal" when the Toggle is clicked', () => {
      sinon.stub(Environments, 'environment').get(() => ALPHA);
      sinon.stub(Config, 'SetLocal');

      const component = Fixture();

      component.find(Toggle).simulate('click');

      sinon.assert.calledOnce(Config.SetLocal);
      sinon.assert.calledWithExactly(Config.SetLocal, true);
    });

    it('should not render a toggle if the environment is not "alpha"', () => {
      sinon.stub(Environments, 'environment').get(() => LIVE);

      const component = Fixture();

      expect(component.exists(Toggle)).equals(false);
    });
  });

  describe('state(idToken)', () => {
    it('should render Sign Up if the user is not logged in', () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: true,
          },
        },
      });

      expect(component.exists('#sign-up')).equals(true);
      expect(component.exists('#sign-out')).equals(false);
    });

    it('should render Sign Out if the user is logged in', () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: false,
          },
        },
      });

      expect(component.exists('#sign-out')).equals(true);
      expect(component.exists('#sign-up')).equals(false);
    });
  });

  describe('Sign Up', () => {
    it('should invoke "login" when clicked', () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: true,
          },
        },
      });

      sinon.assert.notCalled(auth.login);

      component.find('Button#sign-up').simulate('click');

      sinon.assert.calledOnce(auth.login);
    });
  });

  describe('Account Settings', () => {
    it('should open the AccountSettingsModal upon being clicked', () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: false,
          },
        },
      });

      component
        .find('#account-settings')
        .hostNodes()
        .simulate('click');

      expect(component.find(AccountSettingsModal).prop('opened')).equals(true);
    });

    it('should close the AccountSettingsModal when onClose is invoked', async () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: false,
          },
        },
      });

      component
        .find('#account-settings')
        .hostNodes()
        .simulate('click');

      expect(component.find(AccountSettingsModal).prop('opened')).equals(true);

      const { onClose } = component.find(AccountSettingsModal).props();

      await act(async () => onClose());

      component.update();

      expect(component.find(AccountSettingsModal).prop('opened')).equals(false);
    });
  });

  describe('Sign Out', () => {
    it('should invoke "logout" when clicked', () => {
      const component = Fixture({
        props: {
          idToken: {
            expired: false,
          },
        },
      });

      sinon.assert.notCalled(auth.logout);

      component
        .find('#sign-out')
        .hostNodes()
        .simulate('click');

      sinon.assert.calledOnce(auth.logout);
    });
  });
});
