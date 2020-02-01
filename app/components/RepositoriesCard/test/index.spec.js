import sinon from 'sinon';
import { expect } from '@hapi/code';

import { FixtureFactory } from '../../../utils/test/mount';
import {
  MockUntestables,
  MockRepository,
  MockOrganization,
  GenerateArray,
} from '../../../utils/test/mock';
import { RepositoriesCard } from '..';
import { Line } from '../../Line';

describe('<RepositoriesCard />', () => {
  const Fixture = FixtureFactory({
    component: RepositoriesCard,
    props: () => {
      const organization = MockOrganization();

      return {
        organization,
        repositories: GenerateArray(3, (index) =>
          MockRepository({
            id: index,
            organizationID: organization.id,
          }),
        ),
      };
    },
    mountType: 'app',
  });

  beforeEach(() => {
    MockUntestables();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should render the component', () => {
    const component = Fixture();

    expect(component.children().length).equals(1);
  });

  it('should only draw lines between repositories', () => {
    const component = Fixture();

    expect(component.find(Line).length).equals(2);
  });
});
