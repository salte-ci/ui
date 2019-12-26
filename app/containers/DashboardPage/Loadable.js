import React from 'react';
import { loadable } from '../../utils/loadable';
import { LoadingIndicator } from '../../components/LoadingIndicator';

export const DashboardPage = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
