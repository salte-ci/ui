import React from 'react';
import sinon from 'sinon';

import * as Icons from '../icons';

export function MockIcons() {
  sinon.stub(Icons, 'GetIcon').callsFake(icon => () => <div>{icon}.svg</div>);
}

// We should attempt to eliminate this at some point
export function MockUntestables() {
  MockIcons();
}
