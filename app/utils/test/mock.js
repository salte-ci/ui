import React from 'react';
import sinon from 'sinon';
import { Chance } from 'chance';

import { MergeDeep } from '../merge';

import * as Icons from '../icons';

export const chance = Chance();

export function MockIcons() {
  sinon.stub(Icons, 'GetIcon').callsFake(icon => () => <div>{icon}.svg</div>);
}

// We should attempt to eliminate this at some point
export function MockUntestables() {
  MockIcons();
}

const providers = {
  bitbucket: 'Bitbucket',
  github: 'GitHub',
  gitlab: 'GitLab',
};

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
    organizations: new Array(3).fill().map(() => {
      const type = chance.pickone(['bitbucket', 'github', 'gitlab']);

      return {
        provider: {
          key: type,
          name: providers[type],
          type,
        },
        icon: chance.url(),
        key: chance.string(),
        name: chance.string(),
        repositoryCount: chance.integer(),
        buildCount: chance.integer(),
        url: chance.url(),
      };
    }),
  };

  return MergeDeep(state, overrides);
}
