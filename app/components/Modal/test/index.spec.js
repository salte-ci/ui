import React from 'react';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { Modal } from '../index';
import { Button } from '../../Button';

describe('<Modal />', () => {
  beforeEach(() => {
    delete Modal.instance;
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('constructor', () => {
    it('should be a singleton', () => {
      mount(<Modal />);

      expect(Modal.instance).not.equals(undefined);
    });

    it('should ensure it stays a singleton', () => {
      spyOn(console, 'error'); // NOTE: This is being used to silence the error from the console.

      mount(<Modal />);

      expect(() => mount(<Modal />)).throws('The modal container is already defined');
    });
  });

  describe('function(open)', () => {
    const open = (component, props) => {
      const identifier = component.instance().identifier(props || {});
      const promise = Modal.open(props);
      component.update();
      return { promise, identifier };
    };

    it('should complete the promise when close is called', () => {
      const component = mount(<Modal />);

      const { promise, identifier } = open(component);

      component.instance().close(identifier);

      return promise;
    });

    it('should prevent opening the same modal multiple times', async () => {
      const component = mount(<Modal />);

      const { promise, identifier } = open(component);
      const { promise: preventPromise } = open(component);

      component.instance().close(identifier);

      await promise;
      await expect(preventPromise).rejects(Error);
    });

    it('should fail the promise when cancel is called', async () => {
      const component = mount(<Modal />);

      const { promise, identifier } = open(component);

      component.instance().cancel(identifier);

      await expect(promise).rejects(Error);
    });

    it('should ignore multiple close calls', async () => {
      const component = mount(<Modal />);

      const { promise, identifier } = open(component);

      component.instance().close(identifier);
      component.instance().close(identifier);

      return promise;
    });

    it('should ignore multiple cancel calls', async () => {
      const component = mount(<Modal />);

      const { promise, identifier } = open(component);

      component.instance().cancel(identifier);
      component.instance().cancel(identifier);

      await expect(promise).rejects(Error);
    });
  });

  describe('event(onClick)', () => {
    const open = (component, ...args) => {
      const promise = Modal.open(...args);
      component.update();
      return promise;
    };

    it('should close the modal if [data-close] is clicked', () => {
      const component = mount(<Modal />);

      const promise = open(component, {
        children: <Button data-close>Close</Button>,
      });

      component.find('Button[data-close]').simulate('click');

      return promise;
    });

    it('should close the modal if [data-cancel] is clicked', async () => {
      const component = mount(<Modal />);

      const promise = open(component, {
        children: <Button data-cancel>Close</Button>,
      });

      component.find('Button[data-cancel]').simulate('click');

      await expect(promise).rejects(Error);
    });

    it('should open a modal and fail the promise if the backdrop is clicked', async () => {
      const component = mount(<Modal />);

      const promise = open(component);

      component.find('#backdrop').simulate('click');

      await expect(promise).rejects(Error);
    });

    it('should ignore clicks on other children', () => {
      const component = mount(<Modal />);

      const closeSpy = sinon.spy(component.instance(), 'close');
      const cancelSpy = sinon.spy(component.instance(), 'cancel');

      const promise = open(component, {
        children: (
          <>
            <Button id="hello">Hello!</Button>
            <Button data-close>Close</Button>
          </>
        ),
      });

      component.find('Button#hello').simulate('click');

      sinon.assert.notCalled(closeSpy);
      sinon.assert.notCalled(cancelSpy);

      component.find('Button[data-close]').simulate('click');

      sinon.assert.calledOnce(closeSpy);

      return promise;
    });
  });
});
