import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';

import { Dropdown } from '../index';
import { chance } from '../../../utils/test/mock';
import * as Window from '../../../utils/window';

describe('<Dropdown />', () => {
  const RenderComponent = (overrides) => {
    const props = {
      toggle: 'Toggle',
      ...overrides,
    };

    return mount(<Dropdown {...props} />);
  };

  afterEach(() => {
    sinon.restore();
  });

  describe('prop(toggle)', () => {
    it('should support providing a string', () => {
      const toggle = chance.string();
      const component = RenderComponent({
        toggle,
      });

      expect(component.find('[tid="toggle"]').text()).equals(toggle);
    });

    it('should support providing a component', () => {
      const toggle = chance.string();
      const component = RenderComponent({
        toggle: <div>{toggle}</div>,
      });

      expect(component.find('[tid="toggle"]').text()).equals(toggle);
    });
  });

  describe('prop(children)', () => {
    it('should support providing items', () => {
      const component = RenderComponent({
        children: (
          <>
            <Dropdown.Item>Item</Dropdown.Item>
            <Dropdown.Item>Item</Dropdown.Item>
          </>
        ),
      });

      expect(component.find('[tid="dropdown"]').children().length).equals(2);
    });
  });

  describe('prop(alignment)', () => {
    it('should automatically reposition the dropdown upon being opened', async () => {
      const component = RenderComponent();

      component.find('[tid="toggle"]').simulate('click');

      expect(component.find('[tid="dropdown"]').prop('style')).equals({
        left: 10,
        top: 10,
      });
    });

    it('should support being centered', async () => {
      const component = RenderComponent({
        alignment: 'center',
      });

      component.find('[tid="toggle"]').simulate('click');

      expect(component.find('[tid="dropdown"]').prop('style')).equals({
        left: 10,
        top: 10,
      });
    });

    it('should support being right aligned', async () => {
      const component = RenderComponent({
        alignment: 'right',
      });

      component.find('[tid="toggle"]').simulate('click');

      expect(component.find('[tid="dropdown"]').prop('style')).equals({
        left: 10,
        top: 10,
      });
    });
  });

  describe('state(opened)', () => {
    it('should toggle opened when the toggle is clicked', () => {
      const component = RenderComponent();

      component.find('[tid="toggle"]').simulate('click');

      expect(component.find('[tid="dropdown"]').prop('opened')).equals('true');
    });

    it('should register event listeners upon being opened', () => {
      sinon.stub(Window, 'addEventListener');
      sinon.stub(Window, 'removeEventListener');

      const component = RenderComponent();

      sinon.assert.notCalled(Window.addEventListener);

      component.find('[tid="toggle"]').simulate('click');

      sinon.assert.callCount(Window.addEventListener, 3);
      sinon.assert.calledWith(Window.addEventListener, 'click');
      sinon.assert.calledWith(Window.addEventListener, 'resize');
      sinon.assert.calledWith(Window.addEventListener, 'scroll');
    });

    it('should unregister event listeners when opened is changed', () => {
      sinon.stub(Window, 'addEventListener');
      sinon.stub(Window, 'removeEventListener');

      const component = RenderComponent();

      sinon.assert.notCalled(Window.removeEventListener);

      component.find('[tid="toggle"]').simulate('click');

      sinon.assert.callCount(Window.removeEventListener, 3);
      sinon.assert.calledWith(Window.removeEventListener, 'click');
      sinon.assert.calledWith(Window.removeEventListener, 'resize');
      sinon.assert.calledWith(Window.removeEventListener, 'scroll');
    });

    it('should unregister event listeners when unmounted', () => {
      sinon.stub(Window, 'removeEventListener');

      const component = RenderComponent();

      sinon.assert.notCalled(Window.removeEventListener);

      component.unmount();

      sinon.assert.callCount(Window.removeEventListener, 3);
      sinon.assert.calledWith(Window.removeEventListener, 'click');
      sinon.assert.calledWith(Window.removeEventListener, 'resize');
      sinon.assert.calledWith(Window.removeEventListener, 'scroll');
    });

    it('should stay open if the dropdown was clicked', async () => {
      const component = RenderComponent();

      const promise = new Promise((resolve) => {
        sinon.stub(Window, 'addEventListener').callsFake((type, listener) => {
          if (type !== 'click') return;

          const path = [];
          sinon.stub(path, 'includes').returns(true);

          listener({
            path,
          });

          resolve();
        });
      });

      component.find('[tid="toggle"]').simulate('click');

      await promise;

      expect(component.find('[tid="dropdown"]').prop('opened')).equals('true');
    });

    it('should automatically close if anything other then the dropdown was clicked', async () => {
      const component = RenderComponent();

      const promise = new Promise((resolve) => {
        sinon.stub(Window, 'addEventListener').callsFake((type, listener) => {
          if (type !== 'click') return;

          listener({
            path: [],
          });

          resolve();
        });
      });

      component.find('[tid="toggle"]').simulate('click');

      await promise;

      expect(component.find('[tid="dropdown"]').prop('opened')).equals('false');
    });
  });
});
