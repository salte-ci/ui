import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';
import { MountWrapperWithCustomState } from '../../../utils/test/mount';
import { MockUntestables, MockState } from '../../../utils/test/mock';
import { OrganizationCard } from '../index';
import { Accordion } from '../../Accordion';

describe('<OrganizationCard />', () => {
  function renderComponent(propOverrides, stateOverrides, dispatch) {
    const state = MockState(stateOverrides);

    const [organization] = state.organizations;

    const props = {
      organization,
      ...propOverrides,
    };

    return MountWrapperWithCustomState(<OrganizationCard {...props} />, state, dispatch);
  }

  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the component', () => {
    const component = renderComponent();

    expect(component.children().length).equals(1);
  });

  describe('state(state.repositories[organization.id])', () => {
    it('should render the accordion if there are repositories', () => {
      const component = renderComponent();

      expect(component.exists(Accordion)).equals(true);
    });

    it('should not render the accordion if there are no repositories', () => {
      const component = renderComponent(null, {
        repositories: {},
      });

      expect(component.exists(Accordion)).equals(false);
    });
  });

  describe('event(Click)', () => {
    it('should request the repositories', () => {
      const dispatch = sinon.stub();

      const component = renderComponent(
        null,
        {
          repositories: {},
        },
        dispatch,
      );

      sinon.assert.notCalled(dispatch);

      component.find('[tid="card-click-handler"]').simulate('click');

      sinon.assert.calledOnce(dispatch);
    });

    it('should open the Accordion', () => {
      const component = renderComponent();

      expect(component.find(Accordion).prop('opened')).equals(false);

      component.find('[tid="card-click-handler"]').simulate('click');

      expect(component.find(Accordion).prop('opened')).equals(true);
    });

    it('should support closing the Accordion', () => {
      const component = renderComponent();

      component.find('[tid="card-click-handler"]').simulate('click');

      expect(component.find(Accordion).prop('opened')).equals(true);

      component.find('[tid="card-click-handler"]').simulate('click');

      expect(component.find(Accordion).prop('opened')).equals(false);
    });
  });
});
