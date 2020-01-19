import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Accordion } from '../index';
import { chance } from '../../../utils/test/mock';
import * as Render from '../../../utils/render';
import * as Events from '../../../utils/events';

describe('<Accordion />', () => {
  const RenderComponent = (overrides) => {
    const props = {
      children: chance.string(),
      ...overrides,
    };

    return mount(<Accordion {...props} />);
  };

  beforeEach(() => {
    sinon.stub(Render, 'OnNextRender').callsFake((callback) => callback());
    sinon.stub(Events, 'once').resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('prop(opened)', () => {
    it('should render if it is opened', () => {
      const component = RenderComponent({
        opened: true,
      });

      expect(component.children().length).equals(1);
    });

    it('should not render if it is closed', () => {
      const component = RenderComponent({
        opened: false,
      });

      expect(component.children().length).equals(0);
    });

    it('should animate opened from a closed state', () => {
      const component = RenderComponent({
        opened: false,
      });

      component.setProps({
        opened: true,
      });

      expect(component.children().length).equals(1);
      sinon.assert.notCalled(Render.OnNextRender);
      sinon.assert.calledOnce(Events.once);
    });

    it('should animate closed from a opened state', () => {
      const component = RenderComponent({
        opened: true,
      });

      component.setProps({
        opened: false,
      });

      expect(component.children().length).equals(1);
      sinon.assert.calledOnce(Render.OnNextRender);
      sinon.assert.calledOnce(Events.once);
    });
  });
});
