import sinon from 'sinon';
import { expect } from '@hapi/code';

import { FixtureFactory } from '../../../utils/test/mount';

import DashboardPage from '..';
import { ErrorState } from '../../../components/ErrorState';
import { OrganizationCard } from '../../../components/OrganizationCard';
import { MockUntestables, MockState } from '../../../utils/test/mock';

describe('<DashboardPage />', () => {
  const Fixture = FixtureFactory({
    component: DashboardPage,
    state: MockState,
    mountType: 'app',
  });

  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  describe('state(loading.organizations)', () => {
    it('should display the loading indicator if loading', () => {
      const component = Fixture({
        state: {
          loading: {
            organizations: true,
          },
        },
      });

      expect(
        component
          .find('LoadingIndicator[tid="dashboard-loading"]')
          .prop('loading'),
      ).equals(true);
    });

    it('should display the ErrorState if not loading', () => {
      const component = Fixture({
        state: {
          loading: {
            organizations: false,
          },
        },
      });

      expect(
        component
          .find('LoadingIndicator[tid="dashboard-loading"]')
          .prop('loading'),
      ).equals(false);
    });
  });

  describe('state(error.organizations)', () => {
    it('should provide the error to the ErrorState', () => {
      const error = new Error('Whoops!');
      const component = Fixture({
        state: {
          loading: {
            organizations: false,
          },
          error: {
            organizations: error,
          },
        },
      });

      expect(component.find(ErrorState).prop('errors')).equals(error);
    });
  });

  describe('state(organizations)', () => {
    it('should display the organizations', () => {
      const component = Fixture({
        state: {
          loading: {
            organizations: false,
          },
        },
      });

      expect(component.find(OrganizationCard).length).equals(3);
    });
  });
});
