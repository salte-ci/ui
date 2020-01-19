import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { KEY_ESCAPE, KEY_TAB } from 'keycode-js';

import * as Window from '../../../utils/window';
import * as Events from '../../../utils/events';

import { Modal } from '../index';

describe('<Modal />', () => {
  const RenderComponent = (overrides) => {
    const props = {
      component: 'div',
      onClose: sinon.stub(),
      onCancel: sinon.stub(),
      ...overrides,
    };

    return mount(<Modal {...props} />);
  };

  beforeEach(() => {
    sinon.stub(Window, 'addEventListener');
    sinon.stub(Window, 'removeEventListener');
    sinon.stub(Events, 'once').resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set defaults', () => {
    const component = RenderComponent();

    const {
      component: Component,
      onClose,
      onCancel,
      ...props
    } = component.props();

    expect(props).equals({
      variant: 'medium',
    });
  });

  describe('event(onKeyDown)', () => {
    it('should add the "onKeyDown" listener on mount', () => {
      RenderComponent();

      sinon.assert.calledOnce(Window.addEventListener);
      sinon.assert.notCalled(Window.removeEventListener);
    });

    it('should remove the "onKeyDown" listener on unmount', () => {
      const component = RenderComponent();

      component.unmount();

      sinon.assert.calledOnce(Window.addEventListener);
      sinon.assert.calledOnce(Window.removeEventListener);
    });

    it('should close if the escape key is pressed', (done) => {
      Window.addEventListener.restore();
      sinon.stub(Window, 'addEventListener').callsFake((type, callback) => {
        callback({
          keyCode: KEY_ESCAPE,
        });
      });

      RenderComponent({
        onCancel: done,
      });
    });

    it('should not close if any other key is pressed', (done) => {
      Window.addEventListener.restore();
      sinon.stub(Window, 'addEventListener').callsFake((type, callback) => {
        callback({
          keyCode: KEY_TAB,
        });
      });

      RenderComponent({
        onCancel: () => done.fail('Expected onCancel to not get called.'),
      });

      done();
    });
  });

  // props: PropTypes.object,
  // variant: PropTypes.oneOf(['small', 'medium', 'large']),
  describe('prop(component)', () => {
    it('should support providing a custom component', () => {
      const CustomModal = () => <div />;

      const component = RenderComponent({
        component: CustomModal,
      });

      expect(component.exists(CustomModal)).equals(true);
    });

    it('should forward close and cancel functions to the custom component', () => {
      const CustomModal = ({ close, cancel }) => {
        expect(close).function();
        expect(cancel).function();

        return <div />;
      };

      const component = RenderComponent({
        component: CustomModal,
      });

      expect(component.exists(CustomModal)).equals(true);
    });
  });

  describe('prop(onClose)', () => {
    it('should call onClose if an element with "data-close" is clicked', (done) => {
      const component = RenderComponent({
        component: () => <div tid="close" />,
        onClose: done,
      });

      component.find('[tid="close"]').simulate('click', {
        target: {
          dataset: {
            close: true,
          },
        },
      });
    });
  });

  describe('prop(onCancel)', () => {
    it('should call onCancel if an element with "data-cancel" is clicked', (done) => {
      const component = RenderComponent({
        component: () => <div tid="cancel" />,
        onCancel: done,
      });

      component.find('[tid="cancel"]').simulate('click', {
        target: {
          dataset: {
            cancel: true,
          },
        },
      });
    });

    it('should call onCancel if the backdrop is clicked', (done) => {
      const component = RenderComponent({
        onCancel: done,
      });

      component.find('[tid="backdrop"]').simulate('click');
    });

    it('should ignore clicks to anything else', (done) => {
      const component = RenderComponent({
        component: () => <div tid="component" />,
        onCancel: () => done.fail('Expected "onClose" to never be invoked.'),
        onClose: () => done.fail('Expected "onClose" to never be invoked.'),
        onClick: () => done(),
      });

      component.find('[tid="component"]').simulate('click');
    });
  });
});
