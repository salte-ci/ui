import React from 'react';
import sinon from 'sinon';
import { expect } from '@hapi/code';

import { MountWrapper } from '../../../utils/test/mount';
import { MockUntestables, MockRepository, MockOrganization, GenerateArray } from '../../../utils/test/mock';
import { RepositoriesCard } from '../index';
import { Line } from '../../Line';

describe('<RepositoriesCard />', () => {
  function renderComponent(overrides) {
    const organization = MockOrganization();

    const props = {
      organization,
      repositories: GenerateArray(3, index =>
        MockRepository({
          id: index,
          organizationID: organization.id,
        }),
      ),
      ...overrides,
    };

    return MountWrapper(<RepositoriesCard {...props} />);
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

  it('should only draw lines between repositories', () => {
    const component = renderComponent();

    expect(component.find(Line).length).equals(2);
  });
});
