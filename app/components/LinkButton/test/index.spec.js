import { expect } from '@hapi/code';
import sinon from 'sinon';
import {
  MockProvider,
  MockLink,
  MockUntestables,
} from '../../../utils/test/mock';
import { FixtureFactory } from '../../../utils/test/mount';
import { LinkButton } from '..';
import * as LinkActions from '../../../actions/links/actions';

describe('<LinkButton />', () => {
  const Fixture = FixtureFactory({
    component: LinkButton,
    props: () => ({
      provider: MockProvider(),
    }),
    mountType: 'app',
  });

  beforeEach(() => {
    MockUntestables();

    sinon.stub(LinkActions, 'AddLink');
    sinon.stub(LinkActions, 'RemoveLink');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('content', () => {
    it('should display Link if a link is not present', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
      });

      expect(component.text()).contains(`Link ${provider.friendly_name}`);
    });

    it('should display Unlink if a link is present', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
          link: MockLink(),
        },
      });

      expect(component.text()).contains(`Unlink ${provider.friendly_name}`);
    });
  });

  describe('event(click)', () => {
    it('should add a link if one does not already exist', () => {
      const dispatch = sinon.stub();

      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
        dispatch,
      });

      const button = component.find(`Button[tid="${provider.id}"]`);

      const { onClick } = button.props();

      sinon.assert.notCalled(dispatch);

      onClick();

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledOnce(LinkActions.AddLink);
      sinon.assert.notCalled(LinkActions.RemoveLink);
    });

    it('should remove the link if it exists', () => {
      const dispatch = sinon.stub();

      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
          link: MockLink(),
        },
        dispatch,
      });

      const button = component.find(`Button[tid="${provider.id}"]`);

      const { onClick } = button.props();

      sinon.assert.notCalled(dispatch);

      onClick();

      sinon.assert.calledOnce(dispatch);
      sinon.assert.calledOnce(LinkActions.RemoveLink);
      sinon.assert.notCalled(LinkActions.AddLink);
    });
  });

  describe('state(loading.links:{provider_name})', () => {
    it('should set loading to true', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
        state: {
          loading: {
            [`links:${provider.name}`]: true,
          },
        },
      });

      const button = component.find(`Button[tid="${provider.id}"]`);

      expect(button.prop('loading')).equals(true);
    });

    it('should set loading to false', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
        state: {
          loading: {
            [`links:${provider.name}`]: false,
          },
        },
      });

      const button = component.find(`Button[tid="${provider.id}"]`);

      expect(button.prop('loading')).equals(false);
    });
  });

  describe('prop(provider)', () => {
    it('should make the theme match the provider type', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
      });

      expect(component.exists(`Button[tid="${provider.id}"]`)).equals(true);

      const button = component.find(`Button[tid="${provider.id}"]`);

      expect(button.prop('theme')).equals(provider.type);
    });

    it('should make the icon match the provider type', () => {
      const provider = MockProvider({
        id: 'provider',
      });

      const component = Fixture({
        props: {
          provider,
        },
      });

      expect(component.exists(`Button[tid="${provider.id}"]`)).equals(true);

      const button = component.find(`Button[tid="${provider.id}"]`);

      expect(button.prop('icon')).equals(provider.type);
    });
  });
});
