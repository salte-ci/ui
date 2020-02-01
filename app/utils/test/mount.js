import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { expect } from '@hapi/code';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { configureStore } from '../../store';
import { MergeDeep } from '../merge';

function invalidOptions(options) {
  const keys = Object.keys(options).join(', ');

  if (keys.length > 0) {
    throw new Error(`The following options aren't supported. (${keys})`);
  }
}

/**
 * @typedef FixtureFactoryOptions
 * @property {React.Component} component The component to mount.
 * @property {Map<String, any>} props The default properties.
 * @property {Object} state The default state.
 * @property {('basic'|'app')} mountType Whether to mount with a HashRouter and State Provider.
 */

/**
 * @param {FixtureFactoryOptions} options The factory options.
 */
export function FixtureFactory({
  component: Component,
  props: defaultProps = () => ({}),
  state: defaultState = () => ({}),
  mountType = 'basic',
  ...factoryExtraOptions
}) {
  expect(defaultProps).function();
  expect(defaultState).function();
  invalidOptions(factoryExtraOptions);

  return ({
    props: propOverrides,
    state: stateOverrides,
    dispatch = sinon.stub(),
    ...extraOptions
  } = {}) => {
    invalidOptions(extraOptions);

    const props = MergeDeep(defaultProps(), propOverrides);

    switch (mountType) {
      case 'basic':
        return mount(<Component {...props} />);
      case 'app':
        return mount(
          <Provider
            store={configureStore(
              MergeDeep(defaultState(), stateOverrides),
              dispatch,
            )}
          >
            <HashRouter>
              <Component {...props} />
            </HashRouter>
          </Provider>,
        );
      default:
        throw new Error(`Unknown mountType. (${mountType})`);
    }
  };
}

export function MountWrapperWithCustomState(
  children,
  state,
  dispatch = sinon.stub(),
) {
  return mount(
    <Provider store={configureStore(state, dispatch)}>
      <HashRouter>{children}</HashRouter>
    </Provider>,
  );
}
