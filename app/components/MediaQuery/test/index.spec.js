import { expect } from '@hapi/code';
import sinon from 'sinon';
import { MOBILE_QUERY_ONLY, MediaQuery } from '..';
import { chance } from '../../../utils/test/mock';
import * as MediaQueryUtils from '../../../utils/media-query';
import { FixtureFactory } from '../../../utils/test/mount';

describe('<MediaQuery />', () => {
  const Fixture = FixtureFactory({
    component: MediaQuery,
    props: () => ({
      children: chance.string(),
    }),
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('event(mount)', () => {
    it('should register a media query listener', () => {
      sinon.stub(MediaQueryUtils, 'on');

      Fixture();

      sinon.assert.calledOnce(MediaQueryUtils.on);
      sinon.assert.calledWith(MediaQueryUtils.on, MOBILE_QUERY_ONLY);
    });

    it('should update request the updated visibility media value', () => {
      sinon.stub(MediaQueryUtils, 'on');

      Fixture();

      // Wait till after to ensure the calls are coming from the invocation.
      sinon.stub(MediaQueryUtils, 'matches');

      const [, listener] = MediaQueryUtils.on.firstCall.args;

      expect(listener).function();
      sinon.assert.notCalled(MediaQueryUtils.matches);

      listener();

      sinon.assert.calledOnce(MediaQueryUtils.matches);
    });
  });

  describe('event(unmount)', () => {
    it('should register a media query listener', () => {
      sinon.stub(MediaQueryUtils, 'off');

      const component = Fixture();

      sinon.assert.notCalled(MediaQueryUtils.off);

      component.unmount();

      sinon.assert.calledOnce(MediaQueryUtils.off);
      sinon.assert.calledWith(MediaQueryUtils.off, MOBILE_QUERY_ONLY);
    });
  });

  describe('prop(desktop)', () => {
    it('should display if the screen size is not mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(false);

      const children = chance.string();

      const component = Fixture({
        props: {
          children,
          desktop: true,
        },
      });

      expect(component.text()).equals(children);
    });

    it('should not display if the screen size is mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(true);

      const component = Fixture({
        props: {
          children: chance.string(),
          desktop: true,
        },
      });

      expect(component.text()).equals('');
    });
  });

  describe('prop(mobile)', () => {
    it('should display if the screen size is mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(true);

      const children = chance.string();

      const component = Fixture({
        props: {
          children,
          mobile: true,
        },
      });

      expect(component.text()).equals(children);
    });

    it('should not display if the screen size is not mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(false);

      const component = Fixture({
        props: {
          children: chance.string(),
          mobile: true,
        },
      });

      expect(component.text()).equals('');
    });
  });
});
