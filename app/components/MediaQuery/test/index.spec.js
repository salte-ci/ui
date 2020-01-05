import React from 'react';
import { expect } from '@hapi/code';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { MOBILE_QUERY_ONLY, MediaQuery } from '..';
import { chance } from '../../../utils/test/mock';
import * as MediaQueryUtils from '../../../utils/media-query';

describe('<MediaQuery />', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('event(mount)', () => {
    it('should register a media query listener', () => {
      sinon.stub(MediaQueryUtils, 'on');

      mount(<MediaQuery>{chance.string()}</MediaQuery>);

      sinon.assert.calledOnce(MediaQueryUtils.on);
      sinon.assert.calledWith(MediaQueryUtils.on, MOBILE_QUERY_ONLY);
    });

    it('should update request the updated visibility media value', () => {
      sinon.stub(MediaQueryUtils, 'on');

      mount(<MediaQuery>{chance.string()}</MediaQuery>);

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

      const component = mount(<MediaQuery>{chance.string()}</MediaQuery>);

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

      const content = chance.string();

      const component = mount(<MediaQuery desktop>{content}</MediaQuery>);

      expect(component.text()).equals(content);
    });

    it('should not display if the screen size is mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(true);

      const content = chance.string();

      const component = mount(<MediaQuery desktop>{content}</MediaQuery>);

      expect(component.text()).equals('');
    });
  });

  describe('prop(mobile)', () => {
    it('should display if the screen size is mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(true);

      const content = chance.string();

      const component = mount(<MediaQuery mobile>{content}</MediaQuery>);

      expect(component.text()).equals(content);
    });

    it('should not display if the screen size is not mobile', () => {
      sinon
        .stub(MediaQueryUtils, 'matches')
        .withArgs(MOBILE_QUERY_ONLY)
        .returns(false);

      const content = chance.string();

      const component = mount(<MediaQuery mobile>{content}</MediaQuery>);

      expect(component.text()).equals('');
    });
  });
});
