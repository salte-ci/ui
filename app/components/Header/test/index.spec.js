import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import * as Config from '../../../config';

import { Header } from '../index';
import { MountWrapper } from '../../../utils/test/mount';
import { MergeDeep } from '../../../utils/merge';
import { chance, MockUntestables } from '../../../utils/test/mock';
import { auth } from '../../../auth';
import { Toggle } from '../../Toggle';

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
    MockUntestables();

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

  describe('config(environment)', () => {
    it('should render a toggle if the environment is "alpha"', () => {
      sinon.stub(Config, 'environment').get(() => 'alpha');

      const component = RenderComponent();

      expect(component.exists(Toggle)).equals(true);
    });

    it('should call "UpdateLocal" when the Toggle is clicked', () => {
      sinon.stub(Config, 'environment').get(() => 'alpha');
      sinon.stub(Config, 'UpdateLocal');

      const component = RenderComponent();

      component.find(Toggle).simulate('click');

      sinon.assert.calledOnce(Config.UpdateLocal);
      sinon.assert.calledWithExactly(Config.UpdateLocal, true);
    });

    it('should not render a toggle if the environment is not "alpha"', () => {
      sinon.stub(Config, 'environment').get(() => 'live');

      const component = RenderComponent();

      expect(component.exists(Toggle)).equals(false);
    });
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

      expect(component.exists('Button#sign-out')).equals(true);
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
