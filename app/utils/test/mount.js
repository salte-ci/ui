import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { configureStore } from '../../store';
import { MockState } from './mock';
import { MergeDeep } from '../merge';

export function MountWrapperWithCustomState(children, state, dispatch = sinon.stub()) {
  return mount(
    <Provider store={configureStore(state, dispatch)}>
      <HashRouter>{children}</HashRouter>
    </Provider>,
  );
}

export function MountWrapper(children, overrides, dispatch = sinon.stub()) {
  return MountWrapperWithCustomState(children, MergeDeep(MockState(), overrides), dispatch);
}
