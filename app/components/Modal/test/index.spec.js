import { act } from 'react-dom/test-utils';
import { expect } from '@hapi/code';
import sinon from 'sinon';
import { KEY_ESCAPE, KEY_TAB } from 'keycode-js';

import * as Window from '../../../utils/window';
import * as Events from '../../../utils/events';

import { FixtureFactory } from '../../../utils/test/mount';
import { Modal } from '..';
import { chance } from '../../../utils/test/mock';
import { noop } from '../../../utils/noop';
import * as Render from '../../../utils/render';

describe('<Modal />', () => {
  const Fixture = FixtureFactory({
    component: Modal,
    props: () => ({
      children: chance.string(),
      onClose: sinon.stub(),
      onCancel: sinon.stub(),
      opened: true,
    }),
  });

  beforeEach(() => {
    sinon.stub(Window, 'addEventListener');
    sinon.stub(Window, 'removeEventListener');
    sinon.stub(Events, 'once').resolves();
    sinon.stub(Render, 'OnNextRender').resolves();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should set defaults', () => {
    const component = Fixture();

    const { children, onClose, onCancel, ...props } = component.props();

    expect(props).equals({
      opened: true,
      variant: 'medium',
      onCloseFinished: noop,
      onOpenFinished: noop,
    });
  });

  describe('event(onKeyDown)', () => {
    it('should add the "onKeyDown" listener on mount', () => {
      Fixture();

      sinon.assert.calledOnce(Window.addEventListener);
      sinon.assert.notCalled(Window.removeEventListener);
    });

    it('should remove the "onKeyDown" listener on unmount', () => {
      const component = Fixture();

      component.unmount();

      sinon.assert.calledOnce(Window.addEventListener);
      sinon.assert.calledOnce(Window.removeEventListener);
    });

    it('should close if the escape key is pressed', (done) => {
      Window.addEventListener.restore();
      sinon.stub(Window, 'addEventListener').callsFake((type, callback) => {
        if (type === 'keydown') {
          callback({
            keyCode: KEY_ESCAPE,
          });
        }
      });

      Fixture({
        props: {
          onClose: done,
        },
      });
    });

    it('should not close if any other key is pressed', (done) => {
      Window.addEventListener.restore();
      sinon.stub(Window, 'addEventListener').callsFake((type, callback) => {
        if (type === 'keydown') {
          callback({
            keyCode: KEY_TAB,
          });
        }
      });

      Fixture({
        props: {
          onCancel: () => done.fail('Expected onCancel to not get called.'),
        },
      });

      done();
    });
  });

  describe('prop(children)', () => {
    it('should support providing children', () => {
      const children = chance.string();
      const component = Fixture({
        props: {
          children,
        },
      });

      expect(component.text()).contains(children);
    });
  });

  describe('prop(onClose)', () => {
    it('should call onClose if the backdrop is clicked', (done) => {
      const component = Fixture({
        props: {
          onClose: done,
        },
      });

      component.find('[tid="backdrop"]').simulate('click');
    });

    it('should ignore clicks to anything else', (done) => {
      const component = Fixture({
        props: {
          onClose: () => done.fail('Expected "onClose" to never be invoked.'),
          onClick: () => done(),
        },
      });

      component.find('Card[tid="modal"]').simulate('click');
    });
  });

  describe('prop(opened)', () => {
    it('should support being open', () => {
      const component = Fixture({
        props: {
          opened: true,
        },
      });

      expect(component.exists('[tid="backdrop"]')).equals(true);
    });

    it('should support being closed', () => {
      const component = Fixture({
        props: {
          opened: false,
        },
      });

      expect(component.exists('[tid="backdrop"]')).equals(false);
    });
  });

  describe('prop(onCloseFinished)', () => {
    it('should invoke onCloseFinished once the transition is over', async (done) => {
      const component = Fixture({
        props: {
          opened: true,
          onCloseFinished: done,
        },
      });

      await act(async () =>
        component.setProps({
          opened: false,
        }),
      );
    });
  });

  describe('prop(onOpenFinished)', () => {
    it('should invoke onOpenFinished once the transition is over', async (done) => {
      const component = Fixture({
        props: {
          opened: false,
          onOpenFinished: done,
        },
      });

      await act(async () =>
        component.setProps({
          opened: true,
        }),
      );
    });
  });
});
