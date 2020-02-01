import React from 'react';
import sinon from 'sinon';
import { Chance } from 'chance';

import * as Icons from '../icons';
import * as Thunk from '../thunk';

export const chance = Chance();

export function MockIcons() {
  sinon.stub(Icons, 'GetIcon').callsFake((icon) => () => <div>{icon}.svg</div>);
}

// We should attempt to eliminate this at some point
export function MockUntestables() {
  MockIcons();
}

export function MockThunks() {
  sinon.stub(Thunk, 'LoadingThunk').callsFake((key, thunk) => thunk);
}

export function MockState(overrides) {
  const state = {
    auth: {
      auth0: {
        expired: true,
        user: {
          picture: chance.url(),
        },
      },
    },
    loading: {
      organizations: false,
    },
    error: {},
    providers: [
      MockProvider({
        type: 'github',
      }),
      MockProvider({
        type: 'gitlab',
      }),
      MockProvider({
        type: 'bitbucket',
      }),
    ],
    organizations: GenerateArray(3, (index) =>
      MockOrganization({ id: index + 1 }),
    ),
  };

  state.repositories = state.organizations.reduce((output, organization) => {
    // eslint-disable-next-line no-param-reassign
    output[organization.id] = GenerateArray(3, (index) =>
      MockRepository({
        id: index + 1,
        organizationID: organization.id,
      }),
    );
    return output;
  }, {});

  state.links = state.providers.map((provider) =>
    MockLink({
      provider_id: provider.id,
    }),
  );

  return {
    ...state,
    ...overrides,
  };
}

export function MockProvider(overrides) {
  return {
    id: chance.integer({ min: 0 }),
    type: chance.pickone(['github', 'gitlab', 'bitbucket']),
    name: chance.string(),
    friendly_name: chance.string(),
    ...overrides,
  };
}

export function MockLink(overrides) {
  return {
    account_id: chance.integer(),
    provider_id: chance.integer(),
    ...overrides,
  };
}

export function MockOrganization(overrides) {
  const name = chance.word();
  const key = `salte-${name}`;
  const repositoryCount = chance.integer({ min: 1, max: 4 });

  return {
    id: chance.integer(),
    provider: {
      key: 'github',
      name: 'GitHub',
      type: 'github',
    },
    icon: chance.pickone([
      'https://avatars2.githubusercontent.com/u/49458560?s=200&v=4',
      'https://avatars3.githubusercontent.com/u/13248138?s=200&v=4',
    ]),
    key,
    name: `Salte ${name}`,
    repositoryCount,
    buildCount: chance.integer({
      min: repositoryCount,
      max: repositoryCount * 10,
    }),
    url: `https://github.com/${key}`,
    ...overrides,
  };
}

export function MockRepository(overrides) {
  const key = `salte-${chance.word()}/${chance.word()}`;

  return {
    id: chance.integer(),
    organizationID: chance.integer(),
    key,
    buildCount: chance.integer({ min: 1, max: 4 }),
    url: `https://github.com/${key}`,
    ...overrides,
  };
}

export function GenerateArray(size, mapper) {
  return Array(size)
    .fill()
    .map((_, index) => mapper(index));
}
