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

export function MockState(overrides) {
  const state = {
    auth: {
      idTokens: {
        auth0: {
          expired: chance.bool(),
          user: {
            picture: chance.url(),
          },
        },
      },
    },
  };

  return MergeDeep(state, overrides);
}
