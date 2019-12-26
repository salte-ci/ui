import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { configureStore } from '../../store';
import { MockState } from './mock';

export function MountWrapper(children, initialState = MockState(), dispatch) {
  return mount(
    <Provider store={configureStore(initialState, dispatch)}>
      <HashRouter>{children}</HashRouter>
    </Provider>,
  ).find(children.type);
}
