/* istanbul ignore file */
// This is purely to easily visualize each component, no point in testing...

import React from 'react';
import { loadable } from '../../utils/loadable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const StylesheetPage = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
