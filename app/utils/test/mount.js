import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { configureStore } from '../../store';
import { MockState } from './mock';

export function MountWrapper(children, overrides, dispatch = sinon.stub()) {
  return mount(
    <Provider store={configureStore(MockState(overrides), dispatch)}>
      <HashRouter>{children}</HashRouter>
    </Provider>,
  ).find(children.type);
}
