import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { MountWrapper } from '../../../utils/test/mount';

import DashboardPage from '../index';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { ErrorState } from '../../../components/ErrorState';
import { OrganizationCard } from '../../../components/OrganizationCard';
import { MockUntestables } from '../../../utils/test/mock';

describe('<DashboardPage />', () => {
  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = MountWrapper(<DashboardPage />);

    expect(component.children().length).equals(1);
  });

  describe('state(loading.organizations)', () => {
    it('should display the loading indicator if loading', () => {
      const component = MountWrapper(<DashboardPage />, {
        loading: {
          organizations: true,
        },
      });

      expect(component.exists(LoadingIndicator)).equals(true);
      expect(component.exists(ErrorState)).equals(false);
    });

    it('should display the ErrorState if not loading', () => {
      const component = MountWrapper(<DashboardPage />, {
        loading: {
          organizations: false,
        },
      });

      expect(component.exists(ErrorState)).equals(true);
      expect(component.exists(LoadingIndicator)).equals(false);
    });
  });

  describe('state(error.organizations)', () => {
    it('should provide the error to the ErrorState', () => {
      const error = new Error('Whoops!');
      const component = MountWrapper(<DashboardPage />, {
        loading: {
          organizations: false,
        },
        error: {
          organizations: error,
        },
      });

      expect(component.find(ErrorState).prop('error')).equals(error);
    });
  });

  describe('state(organizations)', () => {
    it('should display the organizations', () => {
      const component = MountWrapper(<DashboardPage />, {
        loading: {
          organizations: false,
        },
      });

      expect(component.find(OrganizationCard).length).equals(3);
    });
  });
});
