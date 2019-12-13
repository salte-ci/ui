/* istanbul ignore file */
// Enzyme doesn't like the React Component generated from loadable :(
import React, { lazy, Suspense } from 'react';

export const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
