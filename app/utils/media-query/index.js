const queries = {};

/**
 * @returns {MediaQueryList}
 */
export function query(key) {
  if (!queries[key]) {
    queries[key] = window.matchMedia(key);
  }

  return queries[key];
}

export function on(key, listener) {
  query(key).addEventListener('change', listener, {
    passive: true,
  });
}

export function off(key, listener) {
  query(key).removeEventListener('change', listener);
}

export function matches(key) {
  return query(key).matches;
}
