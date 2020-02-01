import sinon from 'sinon';
import { expect } from '@hapi/code';

import {
  MockUntestables,
  MockProvider,
  MockLink,
} from '../../../utils/test/mock';
import { auth } from '../../../auth';

import * as ProviderActions from '../../../actions/providers/actions';
import * as LinkActions from '../../../actions/links/actions';

import { AccountSettingsModal } from '..';
import { FixtureFactory } from '../../../utils/test/mount';
import { LinkButton } from '../../LinkButton';

describe('<AccountSettingsModal />', () => {
  const Fixture = FixtureFactory({
    component: AccountSettingsModal,
    props: () => ({
      opened: true,
      onClose: sinon.stub(),
    }),
    mountType: 'app',
  });

  beforeEach(() => {
    MockUntestables();

    sinon.stub(auth, 'login');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('event(opened)', () => {
    it('should request the providers and links upon being opened', () => {
      sinon.stub(ProviderActions, 'GetProviders');
      sinon.stub(LinkActions, 'GetLinks');

      const dispatch = sinon.stub();

      Fixture({
        props: {
          opened: true,
        },
        dispatch,
      });

      sinon.assert.calledTwice(dispatch);
      sinon.assert.calledOnce(ProviderActions.GetProviders);
      sinon.assert.calledOnce(LinkActions.GetLinks);
    });
    it('should not request the providers and links while closed', () => {
      sinon.stub(ProviderActions, 'GetProviders');
      sinon.stub(LinkActions, 'GetLinks');

      const dispatch = sinon.stub();

      Fixture({
        props: {
          opened: false,
        },
        dispatch,
      });

      sinon.assert.notCalled(dispatch);
      sinon.assert.notCalled(ProviderActions.GetProviders);
      sinon.assert.notCalled(LinkActions.GetLinks);
    });
  });

  describe('state(providers)', () => {
    it('should render each provider', () => {
      const component = Fixture({
        state: {
          providers: [
            MockProvider({
              id: 'github',
              type: 'github',
            }),
            MockProvider({
              id: 'gitlab',
              type: 'gitlab',
            }),
            MockProvider({
              id: 'bitbucket',
              type: 'bitbucket',
            }),
          ],
        },
      });

      expect(component.find(LinkButton).length).equals(3);
      expect(component.exists('LinkButton[tid="github"]')).equals(true);
      expect(component.exists('LinkButton[tid="gitlab"]')).equals(true);
      expect(component.exists('LinkButton[tid="bitbucket"]')).equals(true);
    });
  });

  describe('state(links)', () => {
    it('should find the corresponding link', () => {
      const provider = MockProvider({
        id: 'github',
        type: 'github',
      });

      const link = MockLink({
        provider_id: provider.id,
      });

      const component = Fixture({
        state: {
          providers: [provider],
          links: [link],
        },
      });

      expect(component.find('LinkButton[tid="github"]').prop('link')).equals(
        link,
      );
    });

    it('should pass undefined if the link does not exist', () => {
      const provider = MockProvider({
        id: 'github',
        type: 'github',
      });

      const component = Fixture({
        state: {
          providers: [provider],
          links: [],
        },
      });

      expect(component.find('LinkButton[tid="github"]').prop('link')).equals(
        undefined,
      );
    });
  });
});
